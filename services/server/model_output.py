import json
import os
import pickle
import shutil

import cv2
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import timm
import torch
import torch.nn.functional as F
from albumentations import (Compose, GaussNoise, HorizontalFlip, Normalize,
                            RandomBrightnessContrast, RandomCrop,
                            RandomRotate90, Resize, ShiftScaleRotate,
                            Transpose, VerticalFlip)
from albumentations.pytorch import ToTensor
from captum.attr import GradientShap
from captum.attr import visualization as viz
from dataset import get_transforms, provider
from matplotlib import pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
from PIL import Image
from sklearn.metrics import (ConfusionMatrixDisplay, accuracy_score,
                             balanced_accuracy_score, confusion_matrix,
                             f1_score, plot_confusion_matrix,
                             precision_recall_curve, precision_score,
                             recall_score, roc_curve)
from torch import nn, optim
from torch.utils.data import DataLoader, Dataset, sampler
from torchvision import datasets, models, transforms

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def save_pickle(filename, obj):
    with open(filename, "wb") as handle:
        pickle.dump(obj, handle, protocol=pickle.HIGHEST_PROTOCOL)


def load_pickle(filename):
    with open(filename, "rb") as handle:
        obj = pickle.load(handle)
    return obj


class Model_output:
    def __init__(
        self,
        model_path=None,
        first_time=False,
        is_plot=False,
        is_run=False,
        is_cpu=True,
        data_path="test_dataset/test.csv",
        data_root="test_dataset/",
        batch_size=64,
    ):

        # self.model = timm.create_model('resnet18',pretrained=True,num_classes=48)
        # self.model.to(device)
        # self.model.load_state_dict(torch.load('')['model_state_dict'])

        #   if not is_plot and not first_time:
        #      model = torch.load(model_path, map_location=torch.device('cpu'))
        #      self.train_metrics = model['train_metrics']
        #      self.model = model['model']
        #      self.model_name = model['name']

        self.is_cpu = is_cpu
        self.model_path_name = model_path.split(".")[0]
        self.model_path = os.path.join("models", model_path)
        self.data_path = data_path
        self.path = data_path
        self.root = data_root
        self.batch_size = batch_size

        if first_time:
            if self.is_cpu:
                model = torch.load(self.model_path, map_location=torch.device("cpu"))
            else:
                model = torch.load(self.model_path)

            self.train_metrics = model["train_metrics"]
            self.model = model["model"]
            self.model_name = model["name"]
            self.model.eval()

            self.df = pd.read_csv(data_path)
            self.sz = self.df.shape[0]

            self.predictions = []
            self.labels = []

            self.metrics = {}
            self.pred()
            self.conf_matrix = confusion_matrix(
                self.labels, np.argmax(self.predictions, axis=1)
            )

            self.manage_pickles_dir()
        elif not is_run:
            base_path = "pickles/" + self.model_path_name

            self.labels = load_pickle(base_path + "_labels.pickle")
            self.predictions = load_pickle(base_path + "_predictions.pickle")

            if not is_plot:
                self.train_metrics = load_pickle(base_path + "_train_metrics.pickle")
                self.metrics = load_pickle(base_path + "_metrics.pickle")
                self.conf_matrix = load_pickle(base_path + "_conf_matrix.pickle")
                self.df = pd.read_csv(data_path)
                self.sz = self.df.shape[0]

    def manage_pickles_dir(self):
        base_path = "pickles/" + self.model_path_name

        save_pickle(base_path + "_predictions.pickle", self.predictions)
        save_pickle(base_path + "_labels.pickle", self.labels)
        save_pickle(base_path + "_metrics.pickle", self.metrics)
        save_pickle(base_path + "_train_metrics.pickle", self.train_metrics)
        save_pickle(base_path + "_conf_matrix.pickle", self.conf_matrix)

    def pred(self):
        # n -> test images
        # return output n * (48 dimensional vector)

        # return metrics **

        data_loader = provider(self.root, self.path, batch_size=self.batch_size)
        image_preds_all = []
        image_targets_all = []

        for batch in data_loader:
            img, target = batch
            image_preds = self.model(img.to(device))
            self.predictions.extend(image_preds.detach().cpu().numpy())
            self.labels.extend(target.detach().cpu().numpy())
            image_preds_all += [torch.argmax(image_preds, 1).detach().cpu().numpy()]
            image_targets_all += [target.detach().cpu().numpy()]

        for i in range(len(self.predictions)):
            x = self.predictions[i]
            self.predictions[i] = np.exp(x) / sum(np.exp(x))

        image_preds_all = np.concatenate(image_preds_all)
        image_targets_all = np.concatenate(image_targets_all)

        weighted_f1_score = f1_score(
            image_targets_all, image_preds_all, average="weighted"
        )
        macro_f1_score = f1_score(image_targets_all, image_preds_all, average="macro")
        balanced_accuracy_score1 = balanced_accuracy_score(
            image_targets_all, image_preds_all
        )
        accuracy_score1 = accuracy_score(image_targets_all, image_preds_all)
        precision_score1 = precision_score(
            image_targets_all, image_preds_all, average="macro"
        )
        recall_score1 = recall_score(
            image_targets_all, image_preds_all, average="macro"
        )

        self.metrics["weighted_f1_score"] = round(weighted_f1_score, 4)
        self.metrics["macro_f1_score"] = round(macro_f1_score, 4)
        self.metrics["accuracy_score"] = round(accuracy_score1, 4)
        self.metrics["precision_score"] = round(precision_score1, 4)
        self.metrics["recall_score"] = round(recall_score1, 4)

    def get_metrics(self):
        return self.train_metrics, self.metrics

    def top_5_classes(self, base_path):
        # n * 5 // n-> no of images in test set
        data = {}
        for itr in range(self.sz):
            arr = list(np.argsort(self.predictions[itr]))
            for i in range(len(arr)):
                arr[i] = int(arr[i])
            arr = arr[43:]
            arr = arr[::-1]
            data[base_path + self.df.image[itr]] = arr
        return data

    def wrong_pred(self):
        # image_name pred correct dataframe
        data = []
        for itr in range(self.sz):
            label = np.argmax(self.predictions[itr])
            if label != self.labels[itr]:
                row = []
                row.append(self.df.image[itr])
                row.append(label)
                row.append(self.labels[itr])
                row.append(round(self.predictions[itr][label], 5))
                data.append(row)

        df = pd.DataFrame(
            np.array(data), columns=["image", "predicted", "actual", "confidence"]
        )
        df = df.sort_values(by=["confidence"], ascending=False)

        return df.to_dict("records")

    def confusion(self):
        fig, ax = plt.subplots(figsize=(50, 50))
        cm_display = ConfusionMatrixDisplay(
            self.conf_matrix, np.unique(np.array(self.labels))
        ).plot(ax=ax)
        matrix_path = "model_output/" + self.model_path_name + "_confusion_matrix.png"
        plt.savefig(matrix_path)
        plt.clf()
        plt.close()
        return matrix_path

    def wrost_acc_classes(self):
        cm = (
            self.conf_matrix.astype("float")
            / self.conf_matrix.sum(axis=1)[:, np.newaxis]
        ) * 100
        onx = list(np.argsort(cm.diagonal()))
        for i in range(len(onx)):
            onx[i] = int(onx[i])
        ony = cm.diagonal()[onx]
        ony = list(np.round(ony, 2))
        for i in range(len(ony)):
            ony[i] = float(ony[i])
        return onx, ony

    def most_confused_classes(self, no_most=5):
        a = self.conf_matrix
        a = (a.astype("float") / a.sum(axis=1)[:, np.newaxis]) * 100
        x = []
        y = []
        for i in range(len(a)):
            for j in range(len(a)):
                if i == j:
                    continue
                x.append(a[i][j])
                y.append((i, j))
        temp = np.argsort(x)
        x = np.array(x)[temp.astype(int)]
        x = x[::-1]
        x = x[:no_most]
        y = np.array(y)[temp.astype(int)]
        y = y[::-1]
        y = y[:no_most]
        strs = []
        for i in range(no_most):
            strs.append([str(round(x[i], 2)), str(y[i][0]), str(y[i][1])])
        return strs

    def precision_recall_curve(self, c):
        preds = torch.tensor(self.predictions)
        preds = preds.softmax(-1)
        labels = torch.tensor(self.labels)
        labels = F.one_hot(labels.long())
        y_true = labels[:, c].numpy()
        y_pred = preds[:, c].numpy()
        precision, recall, thresholds = precision_recall_curve(y_true, y_pred)
        thresholds = np.insert(thresholds, 0, 0)
        return precision, recall, thresholds

    def plot_precision_recall_curve(self, c):
        precision, recall, thresholds = self.precision_recall_curve(c)
        plt.plot(thresholds, precision, label="Precision")
        plt.plot(thresholds, recall, label="Recall")
        plt.title("Precision and Recall for Class " + str(c))
        plt.xlabel("Confidence")
        plt.legend()
        plt.show()
        path1 = (
            "model_output/precision_recall_vs_confidence_"
            + self.model_path_name
            + "_class_"
            + str(c)
            + ".png"
        )
        plt.savefig(path1)
        plt.clf()
        plt.close()

        plt.plot(recall, precision)
        plt.title("Presicion Vs Recall for Class " + str(c))
        plt.xlabel("Recall")
        plt.ylabel("Precision")
        plt.show()
        path2 = (
            "model_output/precision_vs_recall_"
            + self.model_path_name
            + "_class_"
            + str(c)
            + ".png"
        )
        plt.savefig(path2)
        plt.clf()
        plt.close()

        return path1, path2

    def roc_curve(self, c):
        preds = torch.tensor(self.predictions)
        preds = preds.softmax(-1)
        labels = torch.tensor(self.labels)
        labels = F.one_hot(labels.long())
        y_true = labels[:, c].numpy()
        y_pred = preds[:, c].numpy()
        fpr, tpr, thresholds = roc_curve(y_true, y_true, pos_label=1)
        return fpr, tpr, thresholds

    def plot_roc_curve(self, c):
        fpr, tpr, thresholds = self.roc_curve(c=c)
        plt.plot(fpr, tpr)
        plt.title("ROC Curve for Class " + str(c))
        plt.xlabel("False Positive Rate")
        plt.ylabel("True Positive Rate")
        plt.show()
        path = (
            "model_output/roc_curve_"
            + self.model_path_name
            + "_class_"
            + str(c)
            + ".png"
        )
        plt.savefig(path)
        plt.clf()
        plt.close()
        return path

    def plot_curves(self, c):
        path1, path2 = self.plot_precision_recall_curve(c)
        path3 = self.plot_roc_curve(c)

        return path1, path2, path3

    def generate_heatmap(self, img):
        if self.is_cpu:
            model = torch.load(self.model_path, map_location=torch.device("cpu"))
        else:
            model = torch.load(self.model_path)
        model = model["model"]
        model.eval()

        transform = transforms.Compose(
            [transforms.Resize((64, 64)), transforms.ToTensor()]
        )

        transform_normalize = transforms.Normalize(
            mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
        )

        img_t = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(np.uint8(img_t))

        transformed_img = transform(img)
        input = transform_normalize(transformed_img)
        input = input.unsqueeze(0).to(device)

        output = model(input)
        output = F.softmax(output, dim=1)
        prediction_score, pred_label_idx = torch.topk(output, 1)

        pred_label_idx.squeeze_()

        default_cmap = LinearSegmentedColormap.from_list(
            "custom blue", [(0, "#ffffff"), (0.25, "#000000"), (1, "#000000")], N=256
        )

        gradient_shap = GradientShap(model)

        rand_img_dist = torch.cat([input * 0, input * 1])

        attributions_gs = gradient_shap.attribute(
            input,
            n_samples=50,
            stdevs=0.0001,
            baselines=rand_img_dist,
            target=pred_label_idx,
        )
        out = viz.visualize_image_attr_multiple(
            np.transpose(attributions_gs.squeeze().cpu().detach().numpy(), (1, 2, 0)),
            np.transpose(transformed_img.squeeze().cpu().detach().numpy(), (1, 2, 0)),
            ["original_image", "heat_map"],
            ["all", "absolute_value"],
            cmap=default_cmap,
            show_colorbar=True,
        )

        path = "model_output/" + self.model_path_name + "_heat_map.png"
        out[1][0].get_figure().savefig(path)
        plt.clf()
        plt.close()

        return path

    def test_model(self, img):
        if self.is_cpu:
            model = torch.load(self.model_path, map_location=torch.device("cpu"))
        else:
            model = torch.load(self.model_path)
        model = model["model"]
        model.eval()

        img_t = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        img = img_t
        augmented = get_transforms((0.485, 0.456, 0.406), (0.229, 0.224, 0.225))(
            image=img
        )
        imgtf1 = augmented["image"]
        x = imgtf1[np.newaxis, ...]
        x.shape
        x = x.to(device)
        pred = model(x)
        y = pred[0].detach().cpu().numpy()
        y = np.exp(y) / sum(np.exp(y))

        onx = list(np.argsort(y))
        onx = onx[::-1]

        ony = y[onx]
        ony = list(np.round(ony, 2))

        for i in range(len(ony)):
            ony[i] = float(ony[i])

        for i in range(len(onx)):
            onx[i] = str(int(onx[i])).zfill(5)

        return onx, ony

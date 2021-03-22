#  balancing dataset
import os
import random

import albumentations as A
import cv2
import matplotlib.pyplot as plt
import pandas as pd

SERVER_BASE_URL = os.environ["SERVER_BASE_URL"]


class Balance:
    def __init__(self, img_df, min_samples=None):
        self.df = img_df
        self.df.columns = ["image", "label"]
        self.min_samples = min_samples
        if min_samples is None:
            self.min_samples = int(
                (self.df.groupby(by="label").count().values.max()) * 0.8)

        self.oversampling()

    def oversampling(self):
        self.transform = A.Compose([
            A.RandomBrightnessContrast(
                always_apply=False,
                p=0.4,
                brightness_limit=(-0.2, 0.2),
                contrast_limit=(-0.2, 0.2),
            ),
            # A.CLAHE(always_apply=False,
            #         p=0.5,
            #         clip_limit=(1, 4),
            #         tile_grid_size=(8, 8)),
            A.GaussNoise(always_apply=False, p=0.4, var_limit=(20, 40)),
            A.Downscale(
                always_apply=False,
                p=0.4,
                scale_min=0.5,
                scale_max=0.8,
                interpolation=0,
            ),
            A.HueSaturationValue(
                always_apply=False,
                p=0.4,
                hue_shift_limit=(-20, 20),
                sat_shift_limit=(-30, 30),
                val_shift_limit=(-20, 20),
            ),
        ])

    def balance(self):
        class_ids = self.df.label.unique()

        group = self.df.groupby("label")["image"].apply(list)

        balanced_img_paths = []

        for x in range(len(class_ids)):
            id = class_ids[x]

            images = group[id]

            temp = images[0]
            path = temp[:temp.rfind("/") + 1]
            if not os.path.exists(path):
                os.makedirs(path)

            if len(images) >= self.min_samples:
                continue

            for i in range(self.min_samples - len(images)):
                imagepath = random.choice(images)
                image = plt.imread(imagepath)[:,:,:3]
                transformed = self.transform(image=image)
                transformed_image = transformed["image"]
                pathimg = path + "newsample_" + str(id) + str(
                    i) + "." + imagepath.split(".")[-1]
                plt.imsave(pathimg, transformed_image)
                balanced_img_paths.append(SERVER_BASE_URL + pathimg)
                self.df.loc[len(self.df.index)] = [pathimg, id]

        self.df = self.df.groupby(["label"]).size().reset_index(name="counts")

        return self.df.set_index("label").T.to_dict(), balanced_img_paths


# How to use
# balance_obj = Balance(img_df)
# balanced_class_counts, balanced_img_paths = balance_obj.balance()

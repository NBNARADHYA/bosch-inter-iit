import os

import cv2
import numpy as np
import pandas as pd
from albumentations import Compose, Normalize, Resize
from albumentations.pytorch import ToTensor
from torch.utils.data import DataLoader, Dataset, sampler


def get_transforms(mean, std):
    list_transforms = []
    list_transforms.extend(
        [
            Resize(64, 64),
            Normalize(mean=mean, std=std, p=1),
            ToTensor(),
        ]
    )
    list_trfms = Compose(list_transforms)
    return list_trfms


class dataset(Dataset):
    def __init__(self, df, data_folder, mean, std):
        self.df = df
        self.root = data_folder
        self.mean = mean
        self.std = std
        self.transforms = get_transforms(mean, std)
        self.fnames = self.df.index

    def __getitem__(self, idx):
        image_id = self.df["image"].iloc[idx]
        image_path = os.path.join(self.root, image_id)
        img = cv2.imread(image_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        label = self.df.iloc[idx].iloc[1].astype(np.uint8)
        augmented = self.transforms(image=img)
        imgtf1 = augmented["image"]
        return imgtf1, label

    def __len__(self):
        return len(self.fnames)


def provider(
    data_folder,
    df_path,
    batch_size=64,
    mean=(0.485, 0.456, 0.406),
    std=(0.229, 0.224, 0.225),
    num_workers=0,
):
    """Returns dataloader for the model training"""
    data = pd.read_csv(df_path)
    image_dataset = dataset(data, data_folder, mean, std)

    dataloader = DataLoader(
        image_dataset,
        batch_size=batch_size,
        num_workers=num_workers,
        pin_memory=False,
        shuffle=False,
    )

    return dataloader

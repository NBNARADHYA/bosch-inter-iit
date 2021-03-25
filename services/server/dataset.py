import os

import cv2
import numpy as np
import pandas as pd
from albumentations import Compose
from albumentations import Normalize
from albumentations import Resize
from albumentations.pytorch import ToTensor
from torch.utils.data import DataLoader
from torch.utils.data import Dataset
from torch.utils.data import sampler


# Augmentations that have been applied 
def get_transforms(mean, std):
    list_transforms = []
    list_transforms.extend([
        Resize(64, 64),
        Normalize(mean=mean, std=std, p=1),
        ToTensor(),
    ])
    list_trfms = Compose(list_transforms)
    return list_trfms


class dataset(Dataset):
    def __init__(self, df, data_folder, mean, std):
        '''
        Params:
            df: Dataframe to be loaded
            data_folder: Path to dataset
            mean: Mean value used for normalization of images
            std: Standard deviation used for normalization of images
        '''
        self.df = df
        self.root = data_folder
        self.mean = mean
        self.std = std
        self.transforms = get_transforms(mean, std)
        self.fnames = self.df.index

    def __getitem__(self, idx):
        '''
        Params:
            idx: Index of image
        Returns:
            image, label pair for a selected index from the dataframe
        '''
        image_id = self.df["image"].iloc[idx]
        image_path = os.path.join(self.root, image_id)
        img = cv2.imread(image_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        label = self.df.iloc[idx].iloc[1].astype(np.uint8)
        augmented = self.transforms(image=img)
        imgtf1 = augmented["image"]
        return imgtf1, label


    # Returns length of dataset
    def __len__(self):
        return len(self.fnames)


# Returns dataloader for the model training
def provider(
        data_folder,
        df_path,
        batch_size=64,
        mean=(0.485, 0.456, 0.406),
        std=(0.229, 0.224, 0.225),
        num_workers=0,
):
    '''
        Params:
            data_folder: Path to dataset
            df_path: Path to csv
            batch_size: Size of batch
            mean: Mean value used for normalization of images
            std: Standard deviation used for normalization of images
            num_workers: Number of workers
    '''
    
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

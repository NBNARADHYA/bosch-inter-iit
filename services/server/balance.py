#  balancing dataset
import os
import random

import albumentations as A
import cv2
import matplotlib.pyplot as plt
import pandas as pd


class Balance:
    def __init__(self, img_df, min_samples=-1):
        self.df = img_df
        self.df.columns = ["image", "label"]

        if min_samples == -1:
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
            A.CLAHE(always_apply=False,
                    p=0.5,
                    clip_limit=(1, 4),
                    tile_grid_size=(8, 8)),
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
                image = plt.imread(imagepath)
                transformed = self.transform(image=image)
                transformed_image = transformed["image"]
                pathimg = path + "newsample_" + str(id) + str(
                    i) + imagepath[-4:]
                plt.imsave(pathimg, transformed_image)
                self.df.loc[len(self.df.index)] = [pathimg, id]

        self.df = self.df.groupby(["label"]).size().reset_index(name="counts")

        return self.df.set_index("label").T.to_dict()


# How to use
# balance_obj = Balance(img_df)
# balanced_class_counts = balance_obj.balance()

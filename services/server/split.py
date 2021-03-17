import pandas as pd
from sklearn.model_selection import train_test_split


class SplitDataset:
    def __init__(self, img_df, split_percentage=0.2):

        self.df = img_df
        self.df.columns = ["image", "label"]
        self.percentage = split_percentage

    def split(self):
        df_train, df_val = train_test_split(self.df,
                                            test_size=self.percentage,
                                            shuffle=True,
                                            stratify=self.df.label)

        return (df_train, df_val)


# How to use
# split_obj = SplitDataset(img_df)
# xtrain, xval = split_obj.split()

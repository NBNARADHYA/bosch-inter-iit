# This tool assists you to split the dataset into train
# and test sets.A stratified split would be created 
# maintaining the class-wise ratio in both train and test sets.


import pandas as pd
from sklearn.model_selection import train_test_split

# Define SplitDataset class
class SplitDataset:
    def __init__(self, img_df, split_percentage=0.2):
        '''
        Params:
            img_df: Image dataframe before splitting
            split_percentage: Ratio of images the validation set should consist of
        '''
        # Define properties
        self.df = img_df
        self.df.columns = ["image", "label"]
        self.percentage = split_percentage

    # Split the dataset with a specific split percentage
    def split(self):
        '''
        Returns:
            train and validation dataframes
        '''
        df_train, df_val = train_test_split(self.df,
                                            test_size=self.percentage,
                                            shuffle=True,
                                            stratify=self.df.label)

        return (df_train, df_val)


# How to use
# split_obj = SplitDataset(img_df)
# xtrain, xval = split_obj.split()

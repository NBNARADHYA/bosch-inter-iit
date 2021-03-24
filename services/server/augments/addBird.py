import numpy as np
import albumentations
from albumentations.core.transforms_interface import DualTransform
from PIL import Image, ImageOps

class AddBird(DualTransform):
    '''
        Will Update Later
    '''
    
    def __init__(self, frac = 0.5,mask_path = './augments/images/', always_apply=False, p=0.5):
        super(AddBird, self).__init__(always_apply, p)
        
        self.frac       = frac
        self.mask_path  = mask_path

    def apply(self, img, **params):
        
        self.im_h,self.im_w,_ = img.shape
        self.mask_h  = int(self.im_h*self.frac)
        self.mask_w  = int(self.im_w*self.frac)
        
        mask_base = np.zeros((self.im_h,self.im_w,3))
        inverted_mask_base = np.ones((self.im_h,self.im_w,3))
        bird_base = np.ones((self.im_h,self.im_w,3))
        
        left_cor,top_cor,right_cor,bottom_cor = self.get_coordinates()
        new_a , new_b ,_ = mask_base[left_cor:right_cor,top_cor:bottom_cor,:].shape
        toss = np.random.randint(1,4)
        
        bird_mask = Image.open(self.mask_path + 'mask' + str(toss) + '.png').resize((new_b,new_a)).convert('RGB')
        bird_image = Image.open(self.mask_path + 'image' + str(toss) + '.png').resize((new_b,new_a)).convert('RGB')

        inverted_bird_mask = ImageOps.invert(bird_mask)
 
        mask_base[left_cor:right_cor,top_cor:bottom_cor,:] = np.array(bird_mask)/255.0
        bird_base[left_cor:right_cor,top_cor:bottom_cor,:] = np.array(bird_image)
        inverted_mask_base[left_cor:right_cor,top_cor:bottom_cor,:] = np.array(inverted_bird_mask)/255.0
        
        final_img = img*(inverted_mask_base) + mask_base*bird_base
        
        return final_img.astype(np.uint8)
    
    def get_coordinates(self):
        left_cor = np.random.randint(0,self.im_w-self.mask_w )
        top_cor  = np.random.randint(0,self.im_h-self.mask_h )
        right_cor = left_cor + self.mask_w
        bottom_cor = top_cor + self.mask_h
        return left_cor,top_cor,right_cor,bottom_cor

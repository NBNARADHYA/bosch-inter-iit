import numpy as np
import albumentations
from albumentations.core.transforms_interface import DualTransform

class TearAug(DualTransform):
    """Tears the input .
    Args:
        apply_color (int or list) : color with which to fill. Default: sky_blue.
        slider (float) : how much portion to cover of the image. Default: 0.25.
        smoothness (float) : smoothness of the tear. Default: 0.4.
        p (float): probability of applying the transform. Default: 0.5.
    Targets:
        image
    Image types:
        uint8, float32
    """
    
    def __init__(self, apply_color = [135,206,235], slider = 0.25, smoothness =0.4, always_apply=False, p=0.5):
        super(TearAug, self).__init__(always_apply, p)
        
        if isinstance(apply_color, int):
            apply_color = [apply_color,apply_color,apply_color]
        self.apply_color = apply_color
        self.slider = slider
        self.smoothness = smoothness
        self.image_size = None
       

    def apply(self, img, **params):
        
        self.image_size = img.shape[1]
        out = img.copy()
        y1 ,y2 = self.get_par()
        
        x,y = self.get_coordinates(y1,y2)
        
        if y2 > y1:
            for i in range(len(x)):
                out[:x[i],y[i]:,:] = self.apply_color
        else :
            for i in range(len(x)):
                out[x[i]:,y[i]:,:] = self.apply_color
        
        return out
    
    def get_par(self):
        toss = np.random.rand()
        if toss > 0.5 : # y1 < y2
            y1 = np.random.randint(0,int(self.image_size*self.slider))
            y2 = np.random.randint(int(self.image_size*(1-self.slider)),self.image_size)
        else :
            y1 = np.random.randint(int(self.image_size*(1-self.slider)),self.image_size)
            y2 = np.random.randint(0,int(self.image_size*self.slider))
        
        return y1,y2

    def get_coordinates(self,y1,y2):
        x = np.arange(self.image_size -1 ,-1,-5)
        linear_part = ((y2 - y1)*x/self.image_size + y1 )
        coeff_sin = np.mean(linear_part)/(self.smoothness*100)
        y = np.array( linear_part + coeff_sin*np.sin(x),dtype = 'int')
        y = y*(y>0)
        return x,y
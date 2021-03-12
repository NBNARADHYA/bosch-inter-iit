const augmentations =
    [
      {
        id : 1,
        name : 'Blur',
        description : 'Blur the input image using a random-sized kernel.',
        parameters :
            '[{"name":"blur_limit","type":"int, [int, int]","description":"maximum kernel size for blurring the input image. Should be in range [3, inf). Default: (3, 7).","default":7},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 2,
        name : 'ChannelDropout',
        description : 'Randomly Drop Channels in the input Image.',
        parameters :
            '[{"name":"channel_drop_range","type":"[int, int]","description":"range from which we choose the number of channels to drop.","default":"(1,1)"},{"name":"fill_value","type":"int, float","description":"pixel value for the dropped channel.","default":0},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 3,
        name : 'ChannelShuffle',
        description : 'Randomly rearrange channels of the input RGB image.',
        parameters :
            '[{"name":"p","type":"float","description":"probability of applying the transform. ","default":0.5}]',
        category : 0
      },
      {
        id : 4,
        name : 'CLAHE',
        description :
            'Apply Contrast Limited Adaptive Histogram Equalization to the input image.',
        parameters :
            '[{"name":"clip_limit","type":"float or [float, float]","description":"upper threshold value for contrast limiting. If clip_limit is a single float value, the range will be (1, clip_limit). Default: (1, 4).","default":4},{"name":"tile_grid_size","type":"[int, int]","description":"size of grid for histogram equalization. Default: (8, 8).","default":"(8,8)"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 5,
        name : 'CoarseDropout',
        description : 'CoarseDropout of the rectangular regions in the image.',
        parameters :
            '[{"name":"max_holes","type":"int","description":"Maximum number of regions to zero out.","default":8},{"name":"max_height","type":"int","description":"Maximum height of the hole.","default":8},{"name":"max_width","type":"int","description":"Maximum width of the hole.","default":8},{"name":"min_holes","type":"int","description":"Minimum number of regions to zero out. If None, min_holes is be set to max_holes. Default: None.","default":"None"},{"name":"min_height","type":"int","description":"Minimum height of the hole. Default: None. If None, min_height is set to max_height. Default: None.","default":"None"},{"name":"min_width","type":"int","description":"Minimum width of the hole. If None, min_height is set to max_width. Default: None.","default":"None"},{"name":"fill_value","type":"int, float, list of int, list of float","description":"value for dropped pixels.","default":0},{"name":"mask_fill_value","type":"int, float, list of int, list of float","description":"fill value for dropped pixels in mask. If None - mask is not affected. Default: None.","default":"None"}]',
        category : 0
      },
      {
        id : 6,
        name : 'ColorJitter',
        description :
            'Randomly changes the brightness, contrast, and saturation of an image. Compared to ColorJitter from torchvision, this transform gives a little bit different results because Pillow (used in torchvision) and OpenCV (used in Albumentations) transform an image to HSV format by different formulas. Another difference - Pillow uses uint8 overflow, but we use value saturation.',
        parameters :
            '[{"name":"brightness","type":"float or tuple of float (min, max","description":"How much to jitter brightness. brightness_factor is chosen uniformly from [max(0, 1 - brightness), 1 + brightness] or the given [min, max]. Should be non negative numbers.","default":0.2},{"name":"contrast","type":"float or tuple of float (min, max","description":"How much to jitter contrast. contrast_factor is chosen uniformly from [max(0, 1 - contrast), 1 + contrast] or the given [min, max]. Should be non negative numbers.","default":0.2},{"name":"saturation","type":"float or tuple of float (min, max","description":"How much to jitter saturation. saturation_factor is chosen uniformly from [max(0, 1 - saturation), 1 + saturation] or the given [min, max]. Should be non negative numbers.","default":0.2},{"name":"hue","type":"float or tuple of float (min, max","description":"How much to jitter hue. hue_factor is chosen uniformly from [-hue, hue] or the given [min, max]. Should have 0 <= hue <= 0.5 or -0.5 <= min <= max <= 0.5.","default":0.2}]',
        category : 0
      },
      {
        id : 7,
        name : 'Cutout',
        description : 'CoarseDropout of the square regions in the image.',
        parameters :
            '[{"name":"num_holes","type":"int","description":"number of regions to zero out","default":8},{"name":"max_h_size","type":"int","description":"maximum height of the hole","default":8},{"name":"max_w_size","type":"int","description":"maximum width of the hole","default":8},{"name":"fill_value","type":"int, float, list of int, list of float","description":"value for dropped pixels.","default":0}]',
        category : 0
      },
      {
        id : 8,
        name : 'Downscale',
        description :
            'Decreases image quality by downscaling and upscaling back.',
        parameters :
            '[{"name":"scale_min","type":"float","description":"lower bound on the image scale. Should be < 1.","default":0.25},{"name":"scale_max","type":"float","description":"lower bound on the image scale. Should be .","default":0.25},{"name":"interpolation","type":null,"description":"cv2 interpolation method. cv2.INTER_NEAREST by default","default":0}]',
        category : 0
      },
      {
        id : 9,
        name : 'Emboss',
        description :
            'Emboss the input image and overlays the result with the original image.',
        parameters : '[{"name":"alpha","type":"[float, float]","description":"range to choose the visibility of the embossed image. At 0, only the original image is visible,at 1.0 only its embossed version is visible. Default: (0.2, 0.5).","default":"(0.2,0.5)"},{"name":"strength","type":"[float, float]","description":"strength range of the embossing. Default: (0.2, 0.7).","default":"(0.2,0.7)"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 10,
        name : 'Equalize',
        description : 'Equalize the image histogram.',
        parameters :
            `[{"name":"mode","type":"str","description":"{'cv', 'pil'}. Use OpenCV or Pillow equalization method.","default":"'cv'"},{"name":"by_channels","type":"bool","description":"If True, use equalization by channels separately, else convert image to YCbCr representation and use equalization by Y channel.","default":"True"},{"name":"mask","type":"np.ndarray, callable","description":"If given, only the pixels selected by the mask are included in the analysis. Maybe 1 channel or 3 channel array or callable. Function signature must include image argument.","default":"None"},{"name":"mask_params","type":"list of str","description":"Params for mask function.","default":"()"}]`,
        category : 0
      },
      {
        id : 11,
        name : 'FancyPCA',
        description :
            `Augment RGB image using FancyPCA from Krizhevsky's paper "ImageNet Classification with Deep Convolutional Neural Networks"`,
        parameters :
            '[{"name":"alpha","type":"float","description":"how much to perturb/scale the eigen vecs and vals. scale is samples from gaussian distribution (mu=0, sigma=alpha)","default":0.1}]',
        category : 0
      },
      {
        id : 12,
        name : 'Flip',
        description :
            'Flip the input either horizontally, vertically or both horizontally and vertically.',
        parameters :
            '[{"name":"p","type":"float","description":"probability of applying the transform. ","default":0.5}]',
        category : 0
      },
      {
        id : 13,
        name : 'FromFloat',
        description :
            'Take an input array where all values should lie in the range [0, 1.0], multiply them by max_value and then cast the resulted value to a type specified by dtype. If max_value is None the transform will try to infer the maximum value for the data type from the dtype argument.',
        parameters :
            `[{"name":"max_value","type":"float","description":"maximum possible input value. Default: None.","default":"None"},{"name":"dtype","type":"string or numpy data type","description":"data type of the output. See the 'Data types' page from the NumPy docs_. Default: 'uint16'.","default":"'uint16'"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","default":1}]`,
        category : 0
      },
      {
        id : 14,
        name : 'GaussianBlur',
        description :
            'Blur the input image using a Gaussian filter with a random kernel size.',
        parameters :
            '[{"name":"blur_limit","type":"int, [int, int]","description":"maximum Gaussian kernel size for blurring the input image. Must be zero or odd and in range [0, inf). If set to 0 it will be computed from sigma as round(sigma * (3 if img.dtype == np.uint8 else 4) * 2 + 1) + 1. If set single value blur_limit will be in range (0, blur_limit). Default: (3, 7).","default":"(3,7)"},{"name":"sigma_limit","type":"float, [float, float]","description":"Gaussian kernel standard deviation. Must be greater in range [0, inf). If set single value sigma_limit will be in range (0, sigma_limit). If set to 0 sigma will be computed as sigma = 0.3*((ksize-1)*0.5 - 1) + 0.8. ","default":0},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 15,
        name : 'GaussNoise',
        description : 'Apply gaussian noise to the input image.',
        parameters :
            '[{"name":"var_limit","type":"[float, float] or float","description":"variance range for noise. If var_limit is a single float, the range will be (0, var_limit). Default: (10.0, 50.0).","default":"(10.0,50.0)"},{"name":"mean","type":"float","description":"mean of the noise. ","default":0},{"name":"per_channel","type":"bool","description":"if set to True, noise will be sampled for each channel independently. Otherwise, the noise will be sampled once for all channels. Default: True","default":"True"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 16,
        name : 'GlassBlur',
        description : 'Apply glass noise to the input image.',
        parameters :
            `[{"name":"sigma","type":"float","description":"standard deviation for Gaussian kernel.","default":0.7},{"name":"max_delta","type":"int","description":"max distance between pixels which are swapped.","default":4},{"name":"iterations","type":"int","description":"number of repeats. Should be in range [1, inf). Default: (2).","default":2},{"name":"mode","type":"str","description":"mode of computation: fast or exact. Default: \\"fast\\".","default":"'fast'"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]`,
        category : 0
      },
      {
        id : 17,
        name : 'GridDistortion',
        description : null,
        parameters :
            '[{"name":"num_steps","type":"int","description":"count of grid cells on each side.","default":5},{"name":"distort_limit","type":"float, [float, float]","description":"If distort_limit is a single float, the range will be (-distort_limit, distort_limit). Default: (-0.03, 0.03).","default":0.3},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1},{"name":"border_mode","type":"OpenCV flag","description":"flag that is used to specify the pixel extrapolation method. Should be one of: cv2.BORDER_CONSTANT, cv2.BORDER_REPLICATE, cv2.BORDER_REFLECT, cv2.BORDER_WRAP, cv2.BORDER_REFLECT_101. Default: cv2.BORDER_REFLECT_101","default":4},{"name":"value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT.","default":"None"},{"name":"mask_value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT applied for masks.","default":"None"}]',
        category : 0
      },
      {
        id : 18,
        name : 'GridDropout',
        description :
            'GridDropout, drops out rectangular regions of an image and the corresponding mask in a grid fashion.',
        parameters :
            `[{"name":"ratio","type":"float","description":"the ratio of the mask holes to the unit_size (same for horizontal and vertical directions). Must be between 0 and 1. Default: 0.5.","default":0.5},{"name":"unit_size_min","type":"int","description":"minimum size of the grid unit. Must be between 2 and the image shorter edge. If 'None', holes_number_x and holes_number_y are used to setup the grid. Default: None.","default":"None"},{"name":"unit_size_max","type":"int","description":"maximum size of the grid unit. Must be between 2 and the image shorter edge. If 'None', holes_number_x and holes_number_y are used to setup the grid. Default: None.","default":"None"},{"name":"holes_number_x","type":"int","description":"the number of grid units in x direction. Must be between 1 and image width//2. If 'None', grid unit width is set as image_width//10. Default: None.","default":"None"},{"name":"holes_number_y","type":"int","description":"the number of grid units in y direction. Must be between 1 and image height//2. If None, grid unit height is set equal to the grid unit width or image height, whatever is smaller.","default":"None"},{"name":"shift_x","type":"int","description":"offsets of the grid start in x direction from (0,0) coordinate. Clipped between 0 and grid unit_width - hole_width. ","default":0},{"name":"shift_y","type":"int","description":"offsets of the grid start in y direction from (0,0) coordinate. Clipped between 0 and grid unit height - hole_height. ","default":0},{"name":"random_offset","type":"boolean","description":"weather to offset the grid randomly between 0 and grid unit size - hole size If 'True', entered shift_x, shift_y are ignored and set randomly. Default: False.","default":"False"},{"name":"fill_value","type":"int","description":"value for the dropped pixels. Default = 0","default":0},{"name":"mask_fill_value","type":"int","description":"value for the dropped pixels in mask. If None, transformation is not applied to the mask. Default: None.","default":"None"}]`,
        category : 0
      },
      {
        id : 19,
        name : 'HorizontalFlip',
        description : 'Flip the input horizontally around the y-axis.',
        parameters :
            '[{"name":"p","type":"float","description":"probability of applying the transform. ","default":0.5}]',
        category : 0
      },
      {
        id : 20,
        name : 'HueSaturationValue',
        description :
            'Randomly change hue, saturation and value of the input image.',
        parameters :
            '[{"name":"hue_shift_limit","type":"[int, int] or int","description":"range for changing hue. If hue_shift_limit is a single int, the range will be (-hue_shift_limit, hue_shift_limit). Default: (-20, 20).","default":20},{"name":"sat_shift_limit","type":"[int, int] or int","description":"range for changing saturation. If sat_shift_limit is a single int, the range will be (-sat_shift_limit, sat_shift_limit). Default: (-30, 30).","default":30},{"name":"val_shift_limit","type":"[int, int] or int","description":"range for changing value. If val_shift_limit is a single int, the range will be (-val_shift_limit, val_shift_limit). Default: (-20, 20).","default":20},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 21,
        name : 'ImageCompression',
        description : 'Decrease Jpeg, WebP compression of an image.',
        parameters :
            '[{"name":"quality_lower","type":"float","description":"lower bound on the image quality. Should be in [0, 100] range for jpeg and [1, 100] for webp.","default":99},{"name":"quality_upper","type":"float","description":"upper bound on the image quality. Should be in [0, 100] range for jpeg and [1, 100] for webp.","default":100},{"name":"compression_type","type":"ImageCompressionType","description":"should be ImageCompressionType.JPEG or ImageCompressionType.WEBP. Default: ImageCompressionType.JPEG","default":"<ImageCompressionType.JPEG: 0>"}]',
        category : 0
      },
      {
        id : 22,
        name : 'InvertImg',
        description :
            'Invert the input image by subtracting pixel values from 255.',
        parameters :
            '[{"name":"p","type":"float","description":"probability of applying the transform. ","default":0.5}]',
        category : 0
      },
      {
        id : 23,
        name : 'ISONoise',
        description : 'Apply camera sensor noise.',
        parameters :
            '[{"name":"color_shift","type":"[float, float]","description":"variance range for color hue change. Measured as a fraction of 360 degree Hue angle in HLS colorspace.","default":"(0.01,0.05)"},{"name":"intensity","type":"[float, float]","description":"Multiplicative factor that control strength of color and luminace noise.","default":"(0.1,0.5)"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 24,
        name : 'JpegCompression',
        description : 'Decrease Jpeg compression of an image.',
        parameters :
            '[{"name":"quality_lower","type":"float","description":"lower bound on the jpeg quality. Should be in [0, 100] range","default":99},{"name":"quality_upper","type":"float","description":"upper bound on the jpeg quality. Should be in [0, 100] range","default":100}]',
        category : 0
      },
      {
        id : 25,
        name : 'Lambda',
        description :
            'A flexible transformation class for using user-defined transformation functions per targets. Function signature must include **kwargs to accept optinal arguments like interpolation method, image size, etc:',
        parameters :
            '[{"name":"image","type":"callable","description":"Image transformation function.","default":"None"},{"name":"mask","type":"callable","description":"Mask transformation function.","default":"None"},{"name":"keypoint","type":"callable","description":"Keypoint transformation function.","default":"None"},{"name":"bbox","type":"callable","description":"BBox transformation function.","default":"None"},{"name":"always_apply","type":"bool","description":"Indicates whether this transformation should be always applied.","default":"False"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","default":1}]',
        category : 0
      },
      {
        id : 26,
        name : 'MaskDropout',
        description :
            'Image & mask augmentation that zero out mask and image regions corresponding to randomly chosen object instance from mask.',
        parameters :
            `[{"name":"max_objects","type":null,"description":"Maximum number of labels that can be zeroed out. Can be tuple, in this case it's [min, max]","default":1},{"name":"image_fill_value","type":null,"description":"Fill value to use when filling image. Can be 'inpaint' to apply inpaining (works only for 3-chahnel images)","default":0},{"name":"mask_fill_value","type":null,"description":"Fill value to use when filling mask.","default":0}]`,
        category : 0
      },
      {
        id : 27,
        name : 'MedianBlur',
        description :
            'Blur the input image using a median filter with a random aperture linear size.',
        parameters :
            '[{"name":"blur_limit","type":"int","description":"maximum aperture linear size for blurring the input image. Must be odd and in range [3, inf). Default: (3, 7).","default":7},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 28,
        name : 'MotionBlur',
        description :
            'Apply motion blur to the input image using a random-sized kernel.',
        parameters :
            '[{"name":"blur_limit","type":"int","description":"maximum kernel size for blurring the input image. Should be in range [3, inf). ","default":"(3, 7)"},{"name":"p","type":"float","description":"probability of applying the transform. ","default":0.5}]',
        category : 0
      },
      {
        id : 29,
        name : 'MultiplicativeNoise',
        description : 'Multiply image to random number or array of numbers.',
        parameters :
            '[{"name":"multiplier","type":"float or tuple of floats","description":"If single float image will be multiplied to this number. If tuple of float multiplier will be in range [multiplier[0], multiplier[1]). Default: (0.9, 1.1).","default":"(0.9,1.1)"},{"name":"per_channel","type":"bool","description":"If False, same values for all channels will be used. If True use sample values for each channels. Default False.","default":"False"},{"name":"elementwise","type":"bool","description":"If False multiply multiply all pixels in an image with a random value sampled once. If True Multiply image pixels with values that are pixelwise randomly sampled. Defaule: False.","default":"False"}]',
        category : 0
      },
      {
        id : 30,
        name : 'Normalize',
        description :
            'Divide pixel values by 255 = 2**8 - 1, subtract mean per channel and divide by std per channel.',
        parameters :
            '[{"name":"mean","type":"float, list of float","description":"mean values","default":"(0.485,0.456,0.406)"},{"name":"std","type":"(float, list of float","description":"std values","default":"(0.229,0.224,0.225)"},{"name":"max_pixel_value","type":"float","description":"maximum possible pixel value","default":255}]',
        category : 0
      },
      {
        id : 31,
        name : 'OpticalDistortion',
        description : null,
        parameters :
            '[{"name":"distort_limit","type":"float, [float, float]","description":"If distort_limit is a single float, the range will be (-distort_limit, distort_limit). Default: (-0.05, 0.05).","default":0.05},{"name":"shift_limit","type":"float, [float, float]","description":"If shift_limit is a single float, the range will be (-shift_limit, shift_limit). Default: (-0.05, 0.05).","default":0.05},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1},{"name":"border_mode","type":"OpenCV flag","description":"flag that is used to specify the pixel extrapolation method. Should be one of: cv2.BORDER_CONSTANT, cv2.BORDER_REPLICATE, cv2.BORDER_REFLECT, cv2.BORDER_WRAP, cv2.BORDER_REFLECT_101. Default: cv2.BORDER_REFLECT_101","default":4},{"name":"value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT.","default":"None"},{"name":"mask_value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT applied for masks.","default":"None"}]',
        category : 0
      },
      {
        id : 32,
        name : 'PadIfNeeded',
        description :
            'Pad side of the image / max if side is less than desired number.',
        parameters :
            '[{"name":"min_height","type":"int","description":"minimal result image height.","default":1024},{"name":"min_width","type":"int","description":"minimal result image width.","default":1024},{"name":"pad_height_divisor","type":"int","description":"if not None, ensures image height is dividable by value of this argument.","default":"None"},{"name":"pad_width_divisor","type":"int","description":"if not None, ensures image width is dividable by value of this argument.","default":"None"},{"name":"border_mode","type":"OpenCV flag","description":"OpenCV border mode.","default":4},{"name":"value","type":"int, float, list of int, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT.","default":"None"},{"name":"mask_value","type":"int, float, list of int, list of float","description":"padding value for mask if border_mode is cv2.BORDER_CONSTANT.","default":"None"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","default":1}]',
        category : 0
      },
      {
        id : 33,
        name : 'Posterize',
        description : 'Reduce the number of bits for each color channel.',
        parameters :
            '[{"name":"num_bits","type":"[int, int] or int, or list of ints [r, g, b], or list of ints [[r1, r1], [g1, g2], [b1, b2]]","description":"number of high bits. If num_bits is a single value, the range will be [num_bits, num_bits]. Must be in range [0, 8]. Default: 4.","default":4},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 34,
        name : 'RandomBrightness',
        description : 'Randomly change brightness of the input image.',
        parameters :
            '[{"name":"limit","type":"[float, float] or float","description":"factor range for changing brightness. If limit is a single float, the range will be (-limit, limit). Default: (-0.2, 0.2).","default":0.2},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 35,
        name : 'RandomBrightnessContrast',
        description :
            'Randomly change brightness and contrast of the input image.',
        parameters :
            '[{"name":"brightness_limit","type":"[float, float] or float","description":"factor range for changing brightness. If limit is a single float, the range will be (-limit, limit). Default: (-0.2, 0.2).","default":0.2},{"name":"contrast_limit","type":"[float, float] or float","description":"factor range for changing contrast. If limit is a single float, the range will be (-limit, limit). Default: (-0.2, 0.2).","default":0.2},{"name":"brightness_by_max","type":"Boolean","description":"If True adjust contrast by image dtype maximum, else adjust contrast by image mean.","default":"True"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 36,
        name : 'RandomContrast',
        description : 'Randomly change contrast of the input image.',
        parameters :
            '[{"name":"limit","type":"[float, float] or float","description":"factor range for changing contrast. If limit is a single float, the range will be (-limit, limit). Default: (-0.2, 0.2).","default":0.2},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 37,
        name : 'RandomFog',
        description : 'Simulates fog for the image',
        parameters :
            '[{"name":"fog_coef_lower","type":"float","description":"lower limit for fog intensity coefficient. Should be in [0, 1] range.","default":0.3},{"name":"fog_coef_upper","type":"float","description":"upper limit for fog intensity coefficient. Should be in [0, 1] range.","default":1},{"name":"alpha_coef","type":"float","description":"transparency of the fog circles. Should be in [0, 1] range.","default":0.08}]',
        category : 0
      },
      {
        id : 38,
        name : 'RandomGamma',
        description : null,
        parameters :
            '[{"name":"gamma_limit","type":"float or [float, float]","description":"If gamma_limit is a single float value, the range will be (-gamma_limit, gamma_limit). Default: (80, 120).","default":"(80,120)"},{"name":"eps","type":null,"description":"Deprecated.","default":"None"}]',
        category : 0
      },
      {
        id : 39,
        name : 'RandomGridShuffle',
        description : "Random shuffle grid's cells on image.",
        parameters :
            '[{"name":"grid","type":"[int, int]","description":"size of grid for splitting image.","default":"(3,3)"}]',
        category : 0
      },
      {
        id : 40,
        name : 'RandomRain',
        description : 'Adds rain effects.',
        parameters :
            '[{"name":"slant_lower","type":null,"description":"should be in range [-20, 20].","default":-10},{"name":"slant_upper","type":null,"description":"should be in range [-20, 20].","default":10},{"name":"drop_length","type":null,"description":"should be in range [0, 100].","default":20},{"name":"drop_width","type":null,"description":"should be in range [1, 5].","default":1},{"name":"drop_color","type":"list of (r, g, b","description":"rain lines color.","default":"(200,200,200)"},{"name":"blur_value","type":"int","description":"rainy view are blurry","default":7},{"name":"brightness_coefficient","type":"float","description":"rainy days are usually shady. Should be in range [0, 1].","default":0.7},{"name":"rain_type","type":null,"description":"One of [None, \\"drizzle\\", \\"heavy\\", \\"torrestial\\"]","default":"None"}]',
        category : 0
      },
      {
        id : 41,
        name : 'RandomShadow',
        description : 'Simulates shadows for the image',
        parameters :
            '[{"name":"shadow_roi","type":"float, float, float, float","description":"region of the image where shadows will appear (x_min, y_min, x_max, y_max). All values should be in range [0, 1].","default":"(0,0.5,1,1)"},{"name":"num_shadows_lower","type":"int","description":"Lower limit for the possible number of shadows. Should be in range [0, num_shadows_upper].","default":1},{"name":"num_shadows_upper","type":"int","description":"Lower limit for the possible number of shadows. Should be in range [num_shadows_lower, inf].","default":2},{"name":"shadow_dimension","type":"int","description":"number of edges in the shadow polygons","default":5}]',
        category : 0
      },
      {
        id : 42,
        name : 'RandomSnow',
        description : 'Bleach out some pixel values simulating snow.',
        parameters :
            '[{"name":"snow_point_lower","type":"float","description":"lower_bond of the amount of snow. Should be in [0, 1] range","default":0.1},{"name":"snow_point_upper","type":"float","description":"upper_bond of the amount of snow. Should be in [0, 1] range","default":0.3},{"name":"brightness_coeff","type":"float","description":"larger number will lead to a more snow on the image. Should be >= 0","default":2.5}]',
        category : 0
      },
      {
        id : 43,
        name : 'RandomSunFlare',
        description : 'Simulates Sun Flare for the image',
        parameters :
            '[{"name":"flare_roi","type":"float, float, float, float","description":"region of the image where flare will appear (x_min, y_min, x_max, y_max). All values should be in range [0, 1].","default":"(0,0,1,0.5)"},{"name":"angle_lower","type":"float","description":"should be in range [0, angle_upper].","default":0},{"name":"angle_upper","type":"float","description":"should be in range [angle_lower, 1].","default":1},{"name":"num_flare_circles_lower","type":"int","description":"lower limit for the number of flare circles. Should be in range [0, num_flare_circles_upper].","default":6},{"name":"num_flare_circles_upper","type":"int","description":"upper limit for the number of flare circles. Should be in range [num_flare_circles_lower, inf].","default":10},{"name":"src_radius","type":"int","description":null,"default":400},{"name":"src_color","type":"int, int, int","description":"color of the flare","default":"(255,255,255)"}]',
        category : 0
      },
      {
        id : 44,
        name : 'RandomToneCurve',
        description :
            'Randomly change the relationship between bright and dark areas of the image by manipulating its tone curve.',
        parameters :
            `[{"name":"scale","type":"float","description":"standard deviation of the normal distribution. Used to sample random distances to move two control points that modify the image's curve. Values should be in range [0, 1]. Default: 0.1","default":0.1}]`,
        category : 0
      },
      {
        id : 45,
        name : 'RGBShift',
        description :
            'Randomly shift values for each channel of the input RGB image.',
        parameters :
            '[{"name":"r_shift_limit","type":"[int, int] or int","description":"range for changing values for the red channel. If r_shift_limit is a single int, the range will be (-r_shift_limit, r_shift_limit). Default: (-20, 20).","default":20},{"name":"g_shift_limit","type":"[int, int] or int","description":"range for changing values for the green channel. If g_shift_limit is a single int, the range will be (-g_shift_limit, g_shift_limit). Default: (-20, 20).","default":20},{"name":"b_shift_limit","type":"[int, int] or int","description":"range for changing values for the blue channel. If b_shift_limit is a single int, the range will be (-b_shift_limit, b_shift_limit). Default: (-20, 20).","default":20},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 46,
        name : 'Sharpen',
        description :
            'Sharpen the input image and overlays the result with the original image.',
        parameters :
            '[{"name":"alpha","type":"[float, float]","description":"range to choose the visibility of the sharpened image. At 0, only the original image is visible, at 1.0 only its sharpened version is visible. Default: (0.2, 0.5).","default":"(0.2,0.5)"},{"name":"lightness","type":"[float, float]","description":"range to choose the lightness of the sharpened image. Default: (0.5, 1.0).","default":"(0.5,1.0)"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 47,
        name : 'Solarize',
        description : 'Invert all pixel values above a threshold.',
        parameters :
            '[{"name":"threshold","type":"[int, int] or int, or [float, float] or float","description":"range for solarizing threshold.","default":128},{"name":"If","type":"threshold is a single value, the range will be [threshold, threshold]. Default","description":"128.","default":null},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 48,
        name : 'Superpixels',
        description :
            "Transform images parially/completely to their superpixel representation. This implementation uses skimage's version of the SLIC algorithm.",
        parameters :
            '[{"name":"p_replace","type":"float or tuple of float","description":"Defines for any segment the probability that the pixels within that segment are replaced by their average color (otherwise, the pixels are not changed). Examples: * A probability of 0.0 would mean, that the pixels in no segment are replaced by their average color (image is not changed at all). * A probability of 0.5 would mean, that around half of all segments are replaced by their average color. * A probability of 1.0 would mean, that all segments are replaced by their average color (resulting in a voronoi image). Behaviour based on chosen data types for this parameter: * If a float, then that flat will always be used. * If tuple (a, b), then a random probability will be sampled from the interval [a, b] per image.","default":0.1},{"name":"n_segments","type":"int, or tuple of int","description":"Rough target number of how many superpixels to generate (the algorithm may deviate from this number). Lower value will lead to coarser superpixels. Higher values are computationally more intensive and will hence lead to a slowdown * If a single int, then that value will always be used as the number of segments. * If a tuple (a, b), then a value from the discrete interval [a..b] will be sampled per image.","default":100},{"name":"max_size","type":"int or None","description":"Maximum image size at which the augmentation is performed. If the width or height of an image exceeds this value, it will be downscaled before the augmentation so that the longest side matches max_size. This is done to speed up the process. The final output image has the same size as the input image. Note that in case p_replace is below 1.0, the down-/upscaling will affect the not-replaced pixels too. Use None to apply no down-/upscaling.","default":128},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 49,
        name : 'ToFloat',
        description :
            'Divide pixel values by max_value to get a float32 output array where all values lie in the range [0, 1.0]. If max_value is None the transform will try to infer the maximum value by inspecting the data type of the input image.',
        parameters : '[{"name":"max_value","type":"float","description":"maximum possible input value. Default: None.","default":"None"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","default":1}]',
        category : 0
      },
      {
        id : 50,
        name : 'ToGray',
        description :
            'Convert the input RGB image to grayscale. If the mean pixel value for the resulting image is greater than 127, invert the resulting grayscale image.',
        parameters :
            '[{"name":"p","type":"float","description":"probability of applying the transform. ","default":0.5}]',
        category : 0
      },
      {
        id : 51,
        name : 'ToSepia',
        description : 'Applies sepia filter to the input RGB image',
        parameters :
            '[{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 0
      },
      {
        id : 52,
        name : 'Transpose',
        description : 'Transpose the input by swapping rows and columns.',
        parameters :
            '[{"name":"p","type":"float","description":"probability of applying the transform. ","default":0.5}]',
        category : 0
      },
      {
        id : 53,
        name : 'VerticalFlip',
        description : 'Flip the input vertically around the x-axis.',
        parameters :
            '[{"name":"p","type":"float","description":"probability of applying the transform. ","default":0.5}]',
        category : 0
      },
      {
        id : 55,
        name : 'CenterCrop',
        description : 'Crop the central part of the input.',
        parameters :
            '[{"name":"height","type":"int","description":"height of the crop."},{"name":"width","type":"int","description":"width of the crop."},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","default":1}]',
        category : 1
      },
      {
        id : 56,
        name : 'Crop',
        description : 'Crop region from image.',
        parameters :
            '[{"name":"x_min","type":"int","description":"Minimum upper left x coordinate.","default":0},{"name":"y_min","type":"int","description":"Minimum upper left y coordinate.","default":0},{"name":"x_max","type":"int","description":"Maximum lower right x coordinate.","default":1024},{"name":"y_max","type":"int","description":"Maximum lower right y coordinate.","default":1024}]',
        category : 1
      },
      {
        id : 57,
        name : 'CropAndPad',
        description :
            'Crop and pad images by pixel amounts or fractions of image sizes. Cropping removes pixels at the sides (i.e. extracts a subimage from a given full image). Padding adds pixels to the sides (e.g. black pixels). This transformation will never crop images below a height or width of 1.',
        parameters :
            `[{"name":"px","type":"int or tuple","description":"The number of pixels to crop (negative values) or pad (positive values) on each side of the image. Either this or the parameter percent may be set, not both at the same time. * If None, then pixel-based cropping/padding will not be used. * If int, then that exact number of pixels will always be cropped/padded. * If a tuple of two int s with values a and b, then each side will be cropped/padded by a random amount sampled uniformly per image and side from the interval [a, b]. If however sample_independently is set to False, only one value will be sampled per image and used for all sides. * If a tuple of four entries, then the entries represent top, right, bottom, left. Each entry may be a single int (always crop/pad by exactly that value), a tuple of two int s a and b (crop/pad by an amount within [a, b]), a list of int s (crop/pad by a random value that is contained in the list).","default":"None"},{"name":"percent","type":"float or tuple","description":"The number of pixels to crop (negative values) or pad (positive values) on each side of the image given as a fraction of the image height/width. E.g. if this is set to -0.1, the transformation will always crop away 10% of the image's height at both the top and the bottom (both 10% each), as well as 10% of the width at the right and left. Expected value range is (-1.0, inf). Either this or the parameter px may be set, not both at the same time. * If None, then fraction-based cropping/padding will not be used. * If float, then that fraction will always be cropped/padded. * If a tuple of two float s with values a and b, then each side will be cropped/padded by a random fraction sampled uniformly per image and side from the interval [a, b]. If however sample_independently is set to False, only one value will be sampled per image and used for all sides. * If a tuple of four entries, then the entries represent top, right, bottom, left. Each entry may be a single float (always crop/pad by exactly that percent value), a tuple of two float s a and b (crop/pad by a fraction from [a, b]), a list of float s (crop/pad by a random value that is contained in the list).","default":"None"},{"name":"pad_mode","type":"int","description":"OpenCV border mode.","default":0},{"name":"pad_cval","type":"number, Sequence[number]","description":"The constant value to use if the pad mode is BORDER_CONSTANT. * If number, then that value will be used. * If a tuple of two number s and at least one of them is a float, then a random number will be uniformly sampled per image from the continuous interval [a, b] and used as the value. If both number s are int s, the interval is discrete. * If a list of number, then a random value will be chosen from the elements of the list and used as the value.","default":0},{"name":"pad_cval_mask","type":"number, Sequence[number]","description":"Same as pad_cval but only for masks.","default":0},{"name":"keep_size","type":"bool","description":"After cropping and padding, the result image will usually have a different height/width compared to the original input image. If this parameter is set to True, then the cropped/padded image will be resized to the input image's size, i.e. the output shape is always identical to the input shape.","default":"True"},{"name":"sample_independently","type":"bool","description":"If False and the values for px/percent result in exactly one probability distribution for all image sides, only one single value will be sampled from that probability distribution and used for all sides. I.e. the crop/pad amount then is the same for all sides. If True, four values will be sampled independently, one per side.","default":"True"},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1}]`,
        category : 1
      },
      {
        id : 58,
        name : 'CropNonEmptyMaskIfExists',
        description :
            'Crop area with mask if mask is non-empty, else make random crop.',
        parameters :
            '[{"name":"height","type":"int","description":"vertical size of crop in pixels"},{"name":"width","type":"int","description":"horizontal size of crop in pixels"},{"name":"ignore_values","type":"list of int","description":"values to ignore in mask, 0 values are always ignored (e.g. if background value is 5 set ignore_values=[5] to ignore)","default":"None"},{"name":"ignore_channels","type":"list of int","description":"channels to ignore in mask (e.g. if background is a first channel set ignore_channels=[0] to ignore)","default":"None"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","default":1}]',
        category : 1
      },
      {
        id : 59,
        name : 'RandomCrop',
        description : 'Crop a random part of the input.',
        parameters :
            '[{"name":"height","type":"int","description":"height of the crop."},{"name":"width","type":"int","description":"width of the crop."},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","default":1}]',
        category : 1
      },
      {
        id : 60,
        name : 'RandomCropNearBBox',
        description :
            'Crop bbox from image with random shift by x,y coordinates',
        parameters :
            '[{"name":"max_part_shift","type":"float","description":"float value in (0.0, 1.0) range. Default 0.3","default":0.3},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","default":1}]',
        category : 1
      },
      {
        id : 61,
        name : 'RandomResizedCrop',
        description :
            "Torchvision's variant of crop a random part of the input and rescale it to some size.",
        parameters :
            '[{"name":"height","type":"int","description":"height after crop and resize."},{"name":"width","type":"int","description":"width after crop and resize."},{"name":"scale","type":"[float, float]","description":"range of size of the origin size cropped","default":"(0.08,1.0)"},{"name":"ratio","type":"[float, float]","description":"range of aspect ratio of the origin aspect ratio cropped","default":"(0.75,1.3333333333333333)"},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","default":1}]',
        category : 1
      },
      {
        id : 62,
        name : 'RandomSizedBBoxSafeCrop',
        description :
            'Crop a random part of the input and rescale it to some size without loss of bboxes.',
        parameters :
            '[{"name":"height","type":"int","description":"height after crop and resize."},{"name":"width","type":"int","description":"width after crop and resize."},{"name":"erosion_rate","type":"float","description":"erosion rate applied on input image height before crop.","default":0},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","default":1}]',
        category : 1
      },
      {
        id : 63,
        name : 'RandomSizedCrop',
        description :
            'Crop a random part of the input and rescale it to some size.',
        parameters :
            '[{"name":"min_max_height","type":"[int, int]","description":"crop size limits."},{"name":"height","type":"int","description":"height after crop and resize."},{"name":"width","type":"int","description":"width after crop and resize."},{"name":"w2h_ratio","type":"float","description":"aspect ratio of crop.","default":1},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","default":1}]',
        category : 1
      },
      {
        id : 64,
        name : 'LongestMaxSize',
        description :
            'Rescale an image so that maximum side is equal to max_size, keeping the aspect ratio of the initial image.',
        parameters :
            '[{"name":"max_size","type":"int","description":"maximum size of the image after the transformation.","default":1024},{"name":"interpolation","type":"OpenCV flag","description":"interpolation method. Default: cv2.INTER_LINEAR.","default":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","default":1}]',
        category : 2
      },
      {
        id : 65,
        name : 'RandomScale',
        description :
            'Randomly resize the input. Output image size is different from the input image size.',
        parameters :
            '[{"name":"scale_limit","type":"[float, float] or float","description":"scaling factor range. If scale_limit is a single float value, the range will be (1 - scale_limit, 1 + scale_limit). Default: (0.9, 1.1).","default":0.1},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 2
      },
      {
        id : 66,
        name : 'Resize',
        description : 'Resize the input to the given height and width.',
        parameters :
            '[{"name":"height","type":"int","description":"desired height of the output."},{"name":"width","type":"int","description":"desired width of the output."},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","default":1}]',
        category : 2
      },
      {
        id : 67,
        name : 'SmallestMaxSize',
        description :
            'Rescale an image so that minimum side is equal to max_size, keeping the aspect ratio of the initial image.',
        parameters :
            '[{"name":"max_size","type":"int","description":"maximum size of smallest side of the image after the transformation.","default":1024},{"name":"interpolation","type":"OpenCV flag","description":"interpolation method. Default: cv2.INTER_LINEAR.","default":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","default":1}]',
        category : 2
      },
      {
        id : 68,
        name : 'RandomRotate90',
        description :
            'Randomly rotate the input by 90 degrees zero or more times.',
        parameters :
            '[{"name":"p","type":"float","description":"probability of applying the transform. ","default":0.5},{"name":"factor","type":"int","description":"number of times the input will be rotated by 90 degrees.","default":null}]',
        category : 3
      },
      {
        id : 69,
        name : 'Rotate',
        description :
            'Rotate the input by an angle selected randomly from the uniform distribution.',
        parameters :
            '[{"name":"limit","type":"[int, int] or int","description":"range from which a random angle is picked. If limit is a single int an angle is picked from (-limit, limit). Default: (-90, 90)","default":90},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1},{"name":"border_mode","type":"OpenCV flag","description":"flag that is used to specify the pixel extrapolation method. Should be one of: cv2.BORDER_CONSTANT, cv2.BORDER_REPLICATE, cv2.BORDER_REFLECT, cv2.BORDER_WRAP, cv2.BORDER_REFLECT_101. Default: cv2.BORDER_REFLECT_101","default":4},{"name":"value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT.","default":"None"},{"name":"mask_value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT applied for masks.","default":"None"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 3
      },
      {
        id : 70,
        name : 'ElasticTransform',
        description :
            'Elastic deformation of images as described in [Simard2003]_ (with modifications). Based on https://gist.github.com/erniejunior/601cdf56d2b424757de5',
        parameters :
            '[{"name":"alpha","type":"float","description":null,"default":1},{"name":"sigma","type":"float","description":"Gaussian filter parameter.","default":50},{"name":"alpha_affine","type":"float","description":"The range will be (-alpha_affine, alpha_affine)","default":50},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1},{"name":"border_mode","type":"OpenCV flag","description":"flag that is used to specify the pixel extrapolation method. Should be one of: cv2.BORDER_CONSTANT, cv2.BORDER_REPLICATE, cv2.BORDER_REFLECT, cv2.BORDER_WRAP, cv2.BORDER_REFLECT_101. Default: cv2.BORDER_REFLECT_101","default":4},{"name":"value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT.","default":"None"},{"name":"mask_value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT applied for masks.","default":"None"},{"name":"approximate","type":"boolean","description":"Whether to smooth displacement map with fixed kernel size. Enabling this option gives ~2X speedup on large images.","default":"False"}]',
        category : 4
      },
      {
        id : 71,
        name : 'Perspective',
        description :
            'Perform a random four point perspective transform of the input.',
        parameters :
            `[{"name":"scale","type":"float or [float, float]","description":"standard deviation of the normal distributions. These are used to sample the random distances of the subimage's corners from the full image's corners. If scale is a single float value, the range will be (0, scale). Default: (0.05, 0.1).","default":"(0.05,0.1)"},{"name":"keep_size","type":"bool","description":"Whether to resize image’s back to their original size after applying the perspective transform. If set to False, the resulting images may end up having different shapes and will always be a list, never an array. Default: True","default":"True"},{"name":"pad_mode","type":"OpenCV flag","description":"OpenCV border mode.","default":0},{"name":"pad_val","type":"int, float, list of int, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT. ","default":0},{"name":"mask_pad_val","type":"int, float, list of int, list of float","description":"padding value for mask if border_mode is cv2.BORDER_CONSTANT. ","default":0},{"name":"fit_output","type":"bool","description":"If True, the image plane size and position will be adjusted to still capture the whole image after perspective transformation. (Followed by image resizing if keep_size is set to True.) Otherwise, parts of the transformed image may be outside of the image plane. This setting should not be set to True when using large scale values as it could lead to very large images. Default: False","default":"False"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]`,
        category : 4
      },
      {
        id : 72,
        name : 'ShiftScaleRotate',
        description :
            'Randomly apply affine transforms: translate, scale and rotate the input.',
        parameters :
            '[{"name":"shift_limit","type":"[float, float] or float","description":"shift factor range for both height and width. If shift_limit is a single float value, the range will be (-shift_limit, shift_limit). Absolute values for lower and upper bounds should lie in range [0, 1]. Default: (-0.0625, 0.0625).","default":0.0625},{"name":"scale_limit","type":"[float, float] or float","description":"scaling factor range. If scale_limit is a single float value, the range will be (-scale_limit, scale_limit). Default: (-0.1, 0.1).","default":0.1},{"name":"rotate_limit","type":"[int, int] or int","description":"rotation range. If rotate_limit is a single int value, the range will be (-rotate_limit, rotate_limit). Default: (-45, 45).","default":45},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","default":1},{"name":"border_mode","type":"OpenCV flag","description":"flag that is used to specify the pixel extrapolation method. Should be one of: cv2.BORDER_CONSTANT, cv2.BORDER_REPLICATE, cv2.BORDER_REFLECT, cv2.BORDER_WRAP, cv2.BORDER_REFLECT_101. Default: cv2.BORDER_REFLECT_101","default":4},{"name":"value","type":"int, float, list of int, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT.","default":"None"},{"name":"mask_value","type":"int, float, list of int, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT applied for masks.","default":"None"},{"name":"shift_limit_x","type":"[float, float] or float","description":"shift factor range for width. If it is set then this value instead of shift_limit will be used for shifting width. If shift_limit_x is a single float value, the range will be (-shift_limit_x, shift_limit_x). Absolute values for lower and upper bounds should lie in the range [0, 1]. Default: None.","default":"None"},{"name":"shift_limit_y","type":"[float, float] or float","description":"shift factor range for height. If it is set then this value instead of shift_limit will be used for shifting height. If shift_limit_y is a single float value, the range will be (-shift_limit_y, shift_limit_y). Absolute values for lower and upper bounds should lie in the range [0, 1]. Default: None.","default":"None"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 0.5.","default":0.5}]',
        category : 4
      }
    ];

export default augmentations;
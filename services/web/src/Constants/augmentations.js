const augmentations = [
  {
    id: 1,
    name: "Blur",
    description: "Blur the input image using a random-sized kernel.",
    parameters:
      '[{"name":"blur_limit","type":"int, [int, int]","description":"maximum kernel size for blurring the input image. Should be in range [3, inf). Default: (3, 7).","defaultVal":7},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 2,
    name: "ChannelDropout",
    description: "Randomly Drop Channels in the input Image.",
    parameters:
      '[{"name":"channel_drop_range","type":"[int, int]","min": 1, "max": 2,"description":"range from which we choose the number of channels to drop.","defaultVal":"(1,1)"},{"name":"fill_value","min": 0, "max": 255,"type":"int, float","description":"pixel value for the dropped channel.","defaultVal":0},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 3,
    name: "ChannelShuffle",
    description: "Randomly rearrange channels of the input RGB image.",
    parameters:
      '[{"name":"p","type":"float","description":"probability of applying the transform. ","defaultVal":0.5}]',
    category: 0,
  },
  {
    id: 4,
    name: "CLAHE",
    description:
      "Apply Contrast Limited Adaptive Histogram Equalization to the input image.",
    parameters:
      '[{"name":"clip_limit","type":"float or [float, float]","description":"upper threshold value for contrast limiting. If clip_limit is a single float value, the range will be (1, clip_limit). Default: (1, 4).","defaultVal":4},{"name":"tile_grid_size","type":"[int, int]","description":"size of grid for histogram equalization. Default: (8, 8).","defaultVal":"(8,8)"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 5,
    name: "CoarseDropout",
    description: "CoarseDropout of the rectangular regions in the image.",
    parameters:
      '[{"name":"max_holes","type":"int","description":"Maximum number of regions to zero out.","defaultVal":8},{"name":"max_height","type":"int","description":"Maximum height of the hole.","defaultVal":8},{"name":"max_width","type":"int","description":"Maximum width of the hole.","defaultVal":8},{"name":"min_holes","type":"int","description":"Minimum number of regions to zero out. If None, min_holes is be set to max_holes. Default: None."},{"name":"min_height","type":"int","description":"Minimum height of the hole. Default: None. If None, min_height is set to max_height. Default: None."},{"name":"min_width","type":"int","description":"Minimum width of the hole. If None, min_height is set to max_width. Default: None."},{"name":"fill_value","min": 0, "max": 255,"type":"int, float, list of int, list of float","description":"value for dropped pixels.","defaultVal":0},{"name":"mask_fill_value","type":"int, float, list of int, list of float","description":"fill value for dropped pixels in mask. If None - mask is not affected. Default: None."}]',
    category: 0,
  },
  {
    id: 6,
    name: "ColorJitter",
    description:
      "Randomly changes the brightness, contrast, and saturation of an image. Compared to ColorJitter from torchvision, this transform gives a little bit different results because Pillow (used in torchvision) and OpenCV (used in Albumentations) transform an image to HSV format by different formulas. Another difference - Pillow uses uint8 overflow, but we use value saturation.",
    parameters:
      '[{"name":"brightness","type":"float or tuple of float (min, max","description":"How much to jitter brightness. brightness_factor is chosen uniformly from [max(0, 1 - brightness), 1 + brightness] or the given [min, max]. Should be non negative numbers.","defaultVal":0.2},{"name":"contrast","type":"float or tuple of float (min, max","description":"How much to jitter contrast. contrast_factor is chosen uniformly from [max(0, 1 - contrast), 1 + contrast] or the given [min, max]. Should be non negative numbers.","defaultVal":0.2},{"name":"saturation","type":"float or tuple of float (min, max","description":"How much to jitter saturation. saturation_factor is chosen uniformly from [max(0, 1 - saturation), 1 + saturation] or the given [min, max]. Should be non negative numbers.","defaultVal":0.2},{"name":"hue","type":"float or tuple of float (min, max","description":"How much to jitter hue. hue_factor is chosen uniformly from [-hue, hue] or the given [min, max]. Should have 0 <= hue <= 0.5 or -0.5 <= min <= max <= 0.5.","defaultVal":0.2}]',
    category: 0,
  },
  {
    id: 7,
    name: "Cutout",
    description: "CoarseDropout of the square regions in the image.",
    parameters:
      '[{"name":"num_holes","type":"int","description":"number of regions to zero out","defaultVal":8},{"name":"max_h_size","type":"int","description":"maximum height of the hole","defaultVal":8},{"name":"max_w_size","type":"int","description":"maximum width of the hole","defaultVal":8},{"name":"fill_value","min": 0, "max": 255,"type":"int, float, list of int, list of float","description":"value for dropped pixels.","defaultVal":0}]',
    category: 0,
  },
  {
    id: 8,
    name: "Downscale",
    description: "Decreases image quality by downscaling and upscaling back.",
    parameters:
      '[{"name":"scale_min","type":"float","description":"lower bound on the image scale. Should be < 1.","defaultVal":0.25},{"name":"scale_max","type":"float","description":"lower bound on the image scale. Should be .","defaultVal":0.25},{"name":"interpolation","type":null,"description":"cv2 interpolation method. cv2.INTER_NEAREST by default","defaultVal":0}]',
    category: 0,
  },
  {
    id: 10,
    name: "Equalize",
    description: "Equalize the image histogram.",
    parameters: `[{"name":"mode","type":"str","description":"{'cv', 'pil'}. Use OpenCV or Pillow equalization method.","defaultVal":"'cv'"},{"name":"by_channels","type":"bool","description":"If True, use equalization by channels separately, else convert image to YCbCr representation and use equalization by Y channel.","defaultVal":"True"},{"name":"mask","type":"np.ndarray, callable","description":"If given, only the pixels selected by the mask are included in the analysis. Maybe 1 channel or 3 channel array or callable. Function signature must include image argument."},{"name":"mask_params","type":"list of str","description":"Params for mask function.","defaultVal":"()"}]`,
    category: 0,
  },
  {
    id: 11,
    name: "FancyPCA",
    description: `Augment RGB image using FancyPCA from Krizhevsky's paper "ImageNet Classification with Deep Convolutional Neural Networks"`,
    parameters:
      '[{"name":"alpha","type":"float","description":"how much to perturb/scale the eigen vecs and vals. scale is samples from gaussian distribution (mu=0, sigma=alpha)","defaultVal":0.1}]',
    category: 0,
  },
  {
    id: 12,
    name: "Flip",
    description:
      "Flip the input either horizontally, vertically or both horizontally and vertically.",
    parameters:
      '[{"name":"p","type":"float","description":"probability of applying the transform. ","defaultVal":0.5}]',
    category: 0,
  },
  {
    id: 14,
    name: "GaussianBlur",
    description:
      "Blur the input image using a Gaussian filter with a random kernel size.",
    parameters:
      '[{"name":"blur_limit","type":"int, [int, int]","description":"maximum Gaussian kernel size for blurring the input image. Must be zero or odd and in range [0, inf). If set to 0 it will be computed from sigma as round(sigma * (3 if img.dtype == np.uint8 else 4) * 2 + 1) + 1. If set single value blur_limit will be in range (0, blur_limit). Default: (3, 7).","defaultVal":"(3,7)"},{"name":"sigma_limit","type":"float, [float, float]","description":"Gaussian kernel standard deviation. Must be greater in range [0, inf). If set single value sigma_limit will be in range (0, sigma_limit). If set to 0 sigma will be computed as sigma = 0.3*((ksize-1)*0.5 - 1) + 0.8. ","defaultVal":0},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 15,
    name: "GaussNoise",
    description: "Apply gaussian noise to the input image.",
    parameters:
      '[{"name":"var_limit","type":"[float, float] or float","description":"variance range for noise. If var_limit is a single float, the range will be (0, var_limit). Default: (10.0, 50.0).","defaultVal":"(10.0,50.0)"},{"name":"mean","type":"float","description":"mean of the noise. ","defaultVal":0},{"name":"per_channel","type":"bool","description":"if set to True, noise will be sampled for each channel independently. Otherwise, the noise will be sampled once for all channels. Default: True","defaultVal":"True"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 16,
    name: "GlassBlur",
    description: "Apply glass noise to the input image.",
    parameters: `[{"name":"sigma","type":"float","description":"standard deviation for Gaussian kernel.","defaultVal":0.7},{"name":"max_delta","type":"int","description":"max distance between pixels which are swapped.","defaultVal":4},{"name":"iterations","type":"int","description":"number of repeats. Should be in range [1, inf). Default: (2).","defaultVal":2},{"name":"mode","type":"str","description":"mode of computation: fast or exact. Default: \\"fast\\".","defaultVal":"'fast'"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]`,
    category: 0,
  },
  {
    id: 17,
    name: "GridDistortion",
    description: null,
    parameters:
      '[{"name":"num_steps","type":"int","description":"count of grid cells on each side.","defaultVal":5},{"name":"distort_limit","type":"float, [float, float]","description":"If distort_limit is a single float, the range will be (-distort_limit, distort_limit). Default: (-0.03, 0.03).","defaultVal":0.3},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","defaultVal":1},{"name":"border_mode","type":"OpenCV flag","description":"flag that is used to specify the pixel extrapolation method. Should be one of: cv2.BORDER_CONSTANT, cv2.BORDER_REPLICATE, cv2.BORDER_REFLECT, cv2.BORDER_WRAP, cv2.BORDER_REFLECT_101. Default: cv2.BORDER_REFLECT_101","defaultVal":4},{"name":"value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT."},{"name":"mask_value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT applied for masks."}]',
    category: 0,
  },
  {
    id: 18,
    name: "GridDropout",
    description:
      "GridDropout, drops out rectangular regions of an image and the corresponding mask in a grid fashion.",
    parameters: `[{"name":"ratio","type":"float","description":"the ratio of the mask holes to the unit_size (same for horizontal and vertical directions). Must be between 0 and 1. Default: 0.5.","defaultVal":0.5},{"name":"unit_size_min","type":"int","description":"minimum size of the grid unit. Must be between 2 and the image shorter edge. If 'None', holes_number_x and holes_number_y are used to setup the grid. Default: None."},{"name":"unit_size_max","type":"int","description":"maximum size of the grid unit. Must be between 2 and the image shorter edge. If 'None', holes_number_x and holes_number_y are used to setup the grid. Default: None."},{"name":"holes_number_x","type":"int","description":"the number of grid units in x direction. Must be between 1 and image width//2. If 'None', grid unit width is set as image_width//10. Default: None."},{"name":"holes_number_y","type":"int","description":"the number of grid units in y direction. Must be between 1 and image height//2. If None, grid unit height is set equal to the grid unit width or image height, whatever is smaller."},{"name":"shift_x","type":"int","description":"offsets of the grid start in x direction from (0,0) coordinate. Clipped between 0 and grid unit_width - hole_width. ","defaultVal":0},{"name":"shift_y","type":"int","description":"offsets of the grid start in y direction from (0,0) coordinate. Clipped between 0 and grid unit height - hole_height. ","defaultVal":0},{"name":"random_offset","type":"boolean","description":"weather to offset the grid randomly between 0 and grid unit size - hole size If 'True', entered shift_x, shift_y are ignored and set randomly. Default: False.","defaultVal":"False"},{"name":"fill_value","min": 0, "max": 255,"type":"int","description":"value for the dropped pixels. Default = 0","defaultVal":0},{"name":"mask_fill_value","type":"int","description":"value for the dropped pixels in mask. If None, transformation is not applied to the mask. Default: None."}]`,
    category: 0,
  },
  {
    id: 19,
    name: "HorizontalFlip",
    description: "Flip the input horizontally around the y-axis.",
    parameters:
      '[{"name":"p","type":"float","description":"probability of applying the transform. ","defaultVal":0.5}]',
    category: 0,
  },
  {
    id: 20,
    name: "HueSaturationValue",
    description:
      "Randomly change hue, saturation and value of the input image.",
    parameters:
      '[{"name":"hue_shift_limit","type":"[int, int] or int","description":"range for changing hue. If hue_shift_limit is a single int, the range will be (-hue_shift_limit, hue_shift_limit). Default: (-20, 20).","defaultVal":20},{"name":"sat_shift_limit","type":"[int, int] or int","description":"range for changing saturation. If sat_shift_limit is a single int, the range will be (-sat_shift_limit, sat_shift_limit). Default: (-30, 30).","defaultVal":30},{"name":"val_shift_limit","type":"[int, int] or int","description":"range for changing value. If val_shift_limit is a single int, the range will be (-val_shift_limit, val_shift_limit). Default: (-20, 20).","defaultVal":20},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 21,
    name: "ImageCompression",
    description: "Decrease Jpeg, WebP compression of an image.",
    parameters:
      '[{"name":"quality_lower","type":"float","description":"lower bound on the image quality. Should be in [0, 100] range for jpeg and [1, 100] for webp.","defaultVal":99},{"name":"quality_upper","type":"float","description":"upper bound on the image quality. Should be in [0, 100] range for jpeg and [1, 100] for webp.","defaultVal":100},{"name":"compression_type","type":"ImageCompressionType","description":"should be ImageCompressionType.JPEG or ImageCompressionType.WEBP. Default: ImageCompressionType.JPEG","defaultVal":"<ImageCompressionType.JPEG: 0>"}]',
    category: 0,
  },
  {
    id: 22,
    name: "InvertImg",
    description: "Invert the input image by subtracting pixel values from 255.",
    parameters:
      '[{"name":"p","type":"float","description":"probability of applying the transform. ","defaultVal":0.5}]',
    category: 0,
  },
  {
    id: 23,
    name: "ISONoise",
    description: "Apply camera sensor noise.",
    parameters:
      '[{"name":"color_shift","type":"[float, float]","description":"variance range for color hue change. Measured as a fraction of 360 degree Hue angle in HLS colorspace.","defaultVal":"(0.01,0.05)"},{"name":"intensity","type":"[float, float]","min": 0,"max": 2,"description":"Multiplicative factor that control strength of color and luminace noise.","defaultVal":"(0.1,0.5)"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 24,
    name: "JpegCompression",
    description: "Decrease Jpeg compression of an image.",
    parameters:
      '[{"name":"quality_lower","type":"float","description":"lower bound on the jpeg quality. Should be in [0, 100] range","defaultVal":99},{"name":"quality_upper","type":"float","description":"upper bound on the jpeg quality. Should be in [0, 100] range","defaultVal":100}]',
    category: 0,
  },
  {
    id: 27,
    name: "MedianBlur",
    description:
      "Blur the input image using a median filter with a random aperture linear size.",
    parameters:
      '[{"name":"blur_limit","type":"int","description":"maximum aperture linear size for blurring the input image. Must be odd and in range [3, inf). Default: (3, 7).","defaultVal":7},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 28,
    name: "MotionBlur",
    description:
      "Apply motion blur to the input image using a random-sized kernel.",
    parameters:
      '[{"name":"blur_limit","type":"int","description":"maximum kernel size for blurring the input image. Should be in range [3, inf). ","defaultVal":"(3, 7)"},{"name":"p","type":"float","description":"probability of applying the transform. ","defaultVal":0.5}]',
    category: 0,
  },
  {
    id: 29,
    name: "MultiplicativeNoise",
    description: "Multiply image to random number or array of numbers.",
    parameters:
      '[{"name":"multiplier","type":"float or tuple of floats","description":"If single float image will be multiplied to this number. If tuple of float multiplier will be in range [multiplier[0], multiplier[1]). Default: (0.9, 1.1).","defaultVal":"(0.9,1.1)"},{"name":"per_channel","type":"bool","description":"If False, same values for all channels will be used. If True use sample values for each channels. Default False.","defaultVal":"False"},{"name":"elementwise","type":"bool","description":"If False multiply multiply all pixels in an image with a random value sampled once. If True Multiply image pixels with values that are pixelwise randomly sampled. Defaule: False.","defaultVal":"False"}]',
    category: 0,
  },
  {
    id: 31,
    name: "OpticalDistortion",
    description: null,
    parameters:
      '[{"name":"distort_limit","type":"float, [float, float]","description":"If distort_limit is a single float, the range will be (-distort_limit, distort_limit). Default: (-0.05, 0.05).","defaultVal":0.05},{"name":"shift_limit","type":"float, [float, float]","description":"If shift_limit is a single float, the range will be (-shift_limit, shift_limit). Default: (-0.05, 0.05).","defaultVal":0.05},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","defaultVal":1},{"name":"border_mode","type":"OpenCV flag","description":"flag that is used to specify the pixel extrapolation method. Should be one of: cv2.BORDER_CONSTANT, cv2.BORDER_REPLICATE, cv2.BORDER_REFLECT, cv2.BORDER_WRAP, cv2.BORDER_REFLECT_101. Default: cv2.BORDER_REFLECT_101","defaultVal":4},{"name":"value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT."},{"name":"mask_value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT applied for masks."}]',
    category: 0,
  },
  {
    id: 32,
    name: "PadIfNeeded",
    description:
      "Pad side of the image / max if side is less than desired number.",
    parameters:
      '[{"name":"min_height","type":"int","description":"minimal result image height.","defaultVal":1024},{"name":"min_width","type":"int","description":"minimal result image width.","defaultVal":1024},{"name":"pad_height_divisor","type":"int","description":"if not None, ensures image height is dividable by value of this argument."},{"name":"pad_width_divisor","type":"int","description":"if not None, ensures image width is dividable by value of this argument."},{"name":"border_mode","type":"OpenCV flag","description":"OpenCV border mode.","defaultVal":4},{"name":"value","type":"int, float, list of int, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT."},{"name":"mask_value","type":"int, float, list of int, list of float","description":"padding value for mask if border_mode is cv2.BORDER_CONSTANT."},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1}]',
    category: 0,
  },
  {
    id: 33,
    name: "Posterize",
    description: "Reduce the number of bits for each color channel.",
    parameters:
      '[{"name":"num_bits","type":"[int, int] or int, or list of ints [r, g, b], or list of ints [[r1, r1], [g1, g2], [b1, b2]]","description":"number of high bits. If num_bits is a single value, the range will be [num_bits, num_bits]. Must be in range [0, 8]. Default: 4.","defaultVal":4},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 34,
    name: "RandomBrightness",
    description: "Randomly change brightness of the input image.",
    parameters:
      '[{"name":"limit","type":"[float, float] or float","description":"factor range for changing brightness. If limit is a single float, the range will be (-limit, limit). Default: (-0.2, 0.2).","defaultVal":0.2},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 35,
    name: "RandomBrightnessContrast",
    description: "Randomly change brightness and contrast of the input image.",
    parameters:
      '[{"name":"brightness_limit","type":"[float, float] or float","description":"factor range for changing brightness. If limit is a single float, the range will be (-limit, limit). Default: (-0.2, 0.2).","defaultVal":0.2},{"name":"contrast_limit","type":"[float, float] or float","description":"factor range for changing contrast. If limit is a single float, the range will be (-limit, limit). Default: (-0.2, 0.2).","defaultVal":0.2},{"name":"brightness_by_max","type":"Boolean","description":"If True adjust contrast by image dtype maximum, else adjust contrast by image mean.","defaultVal":"True"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 36,
    name: "RandomContrast",
    description: "Randomly change contrast of the input image.",
    parameters:
      '[{"name":"limit","type":"[float, float] or float","description":"factor range for changing contrast. If limit is a single float, the range will be (-limit, limit). Default: (-0.2, 0.2).","defaultVal":0.2},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 37,
    name: "RandomFog",
    description: "Simulates fog for the image",
    parameters:
      '[{"name":"fog_coef_lower","type":"float","description":"lower limit for fog intensity coefficient. Should be in [0, 1] range.","defaultVal":0.3,"min": 0, "max": 1},{"name":"fog_coef_upper","type":"float","description":"upper limit for fog intensity coefficient. Should be in [0, 1] range.","defaultVal":1,"min": 0, "max": 1},{"name":"alpha_coef","type":"float","description":"transparency of the fog circles. Should be in [0, 1] range.","defaultVal":0.08,"min": 0, "max": 1}]',
    category: 0,
  },
  {
    id: 38,
    name: "RandomGamma",
    description: null,
    parameters:
      '[{"name":"gamma_limit","type":"float or [float, float]","description":"If gamma_limit is a single float value, the range will be (-gamma_limit, gamma_limit). Default: (80, 120).","defaultVal":"(80,120)"},{"name":"eps","type":null,"description":"Deprecated."}]',
    category: 0,
  },
  {
    id: 39,
    name: "RandomGridShuffle",
    description: "Random shuffle grid's cells on image.",
    parameters:
      '[{"name":"grid","type":"[int, int]","description":"size of grid for splitting image.","defaultVal":"(3,3)"}]',
    category: 0,
  },
  {
    id: 40,
    name: "RandomRain",
    description: "Adds rain effects.",
    parameters:
      '[{"name":"slant_lower","type":null,"description":"should be in range [-20, 20].","defaultVal":-10},{"name":"slant_upper","type":null,"description":"should be in range [-20, 20].","defaultVal":10},{"name":"drop_length","type":null,"description":"should be in range [0, 100].","defaultVal":20},{"name":"drop_width","type":null,"description":"should be in range [1, 5].","defaultVal":1},{"name":"drop_color","type":"list of (r, g, b","description":"rain lines color.","defaultVal":"(200,200,200)"},{"name":"blur_value","type":"int","description":"rainy view are blurry","defaultVal":7},{"name":"brightness_coefficient","type":"float","description":"rainy days are usually shady. Should be in range [0, 1].","defaultVal":0.7,"min": 0, "max": 1},{"name":"rain_type","type":null,"description":"One of [None, \\"drizzle\\", \\"heavy\\", \\"torrestial\\"]"}]',
    category: 0,
  },
  {
    id: 41,
    name: "RandomShadow",
    description: "Simulates shadows for the image",
    parameters:
      '[{"name":"num_shadows_lower","type":"int","description":"Lower limit for the possible number of shadows. Should be in range [0, num_shadows_upper].","defaultVal":1},{"name":"num_shadows_upper","type":"int","description":"Lower limit for the possible number of shadows. Should be in range [num_shadows_lower, inf].","defaultVal":2},{"name":"shadow_dimension","type":"int","description":"number of edges in the shadow polygons","defaultVal":5}]',
    category: 0,
  },
  {
    id: 42,
    name: "RandomSnow",
    description: "Bleach out some pixel values simulating snow.",
    parameters:
      '[{"name":"snow_point_lower","type":"float","description":"lower_bond of the amount of snow. Should be in [0, 1] range","defaultVal":0.1,"min": 0, "max": 1},{"name":"snow_point_upper","type":"float","description":"upper_bond of the amount of snow. Should be in [0, 1] range","defaultVal":0.3,"min": 0, "max": 1},{"name":"brightness_coeff","type":"float","description":"larger number will lead to a more snow on the image. Should be >= 0","defaultVal":2.5}]',
    category: 0,
  },
  {
    id: 43,
    name: "RandomSunFlare",
    description: "Simulates Sun Flare for the image",
    parameters:
      '[{"name":"angle_lower","type":"float","description":"should be in range [0, angle_upper].","defaultVal":0,"min":0,"max":1},{"name":"angle_upper","type":"float","description":"should be in range [angle_lower, 1].","defaultVal":1,"min":0,"max":1},{"name":"num_flare_circles_lower","type":"int","description":"lower limit for the number of flare circles. Should be in range [0, num_flare_circles_upper].","defaultVal":6},{"name":"num_flare_circles_upper","type":"int","description":"upper limit for the number of flare circles. Should be in range [num_flare_circles_lower, inf].","defaultVal":10},{"name":"src_radius","type":"int","description":null,"defaultVal":400}]',
    category: 0,
  },
  {
    id: 45,
    name: "RGBShift",
    description:
      "Randomly shift values for each channel of the input RGB image.",
    parameters:
      '[{"name":"r_shift_limit","type":"[int, int] or int","description":"range for changing values for the red channel. If r_shift_limit is a single int, the range will be (-r_shift_limit, r_shift_limit). Default: (-20, 20).","defaultVal":20},{"name":"g_shift_limit","type":"[int, int] or int","description":"range for changing values for the green channel. If g_shift_limit is a single int, the range will be (-g_shift_limit, g_shift_limit). Default: (-20, 20).","defaultVal":20},{"name":"b_shift_limit","type":"[int, int] or int","description":"range for changing values for the blue channel. If b_shift_limit is a single int, the range will be (-b_shift_limit, b_shift_limit). Default: (-20, 20).","defaultVal":20},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 47,
    name: "Solarize",
    description: "Invert all pixel values above a threshold.",
    parameters:
      '[{"name":"threshold","type":"[int, int] or int, or [float, float] or float","description":"range for solarizing threshold.","defaultVal":128},{"name":"If","type":"threshold is a single value, the range will be [threshold, threshold]. Default","description":"128.","defaultVal":null},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 50,
    name: "ToGray",
    description:
      "Convert the input RGB image to grayscale. If the mean pixel value for the resulting image is greater than 127, invert the resulting grayscale image.",
    parameters:
      '[{"name":"p","type":"float","description":"probability of applying the transform. ","defaultVal":0.5}]',
    category: 0,
  },
  {
    id: 51,
    name: "ToSepia",
    description: "Applies sepia filter to the input RGB image",
    parameters:
      '[{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 0,
  },
  {
    id: 52,
    name: "Transpose",
    description: "Transpose the input by swapping rows and columns.",
    parameters:
      '[{"name":"p","type":"float","description":"probability of applying the transform. ","defaultVal":0.5}]',
    category: 0,
  },
  {
    id: 53,
    name: "VerticalFlip",
    description: "Flip the input vertically around the x-axis.",
    parameters:
      '[{"name":"p","type":"float","description":"probability of applying the transform. ","defaultVal":0.5}]',
    category: 0,
  },
  {
    id: 55,
    name: "CenterCrop",
    description: "Crop the central part of the input.",
    parameters:
      '[{"name":"height","type":"int","description":"height of the crop.","min":1, "max": "h"},{"name":"width","type":"int","description":"width of the crop.","min":1, "max": "w"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","defaultVal":1}]',
    category: 1,
  },
  {
    id: 56,
    name: "Crop",
    description: "Crop region from image.",
    parameters:
      '[{"name":"x_min","type":"int","description":"Minimum upper left x coordinate.","defaultVal":0,"min":0,"max":"w"},{"name":"y_min","type":"int","description":"Minimum upper left y coordinate.","defaultVal":0,"min":0,"max":"h"},{"name":"x_max","type":"int","description":"Maximum lower right x coordinate.","min":1, "max": "w"},{"name":"y_max","type":"int","description":"Maximum lower right y coordinate.","min":1, "max": "h"}]',
    category: 1,
  },
  {
    id: 59,
    name: "RandomCrop",
    description: "Crop a random part of the input.",
    parameters:
      '[{"name":"height","type":"int","description":"height of the crop.","min":1, "max": "h"},{"name":"width","type":"int","description":"width of the crop.","min":1, "max": "w"},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","defaultVal":1}]',
    category: 1,
  },
  {
    id: 61,
    name: "RandomResizedCrop",
    description:
      "Torchvision's variant of crop a random part of the input and rescale it to some size.",
    parameters:
      '[{"name":"height","type":"int","description":"height after crop and resize.","min":1, "max": "h"},{"name":"width","type":"int","description":"width after crop and resize.","min":1, "max": "w"},{"name":"scale","type":"[float, float]","description":"range of size of the origin size cropped","defaultVal":"(0.08,1.0)"},{"name":"ratio","type":"[float, float]","description":"range of aspect ratio of the origin aspect ratio cropped","defaultVal":"(0.75,1.3333333333333333)"},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","defaultVal":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","defaultVal":1}]',
    category: 1,
  },
  {
    id: 63,
    name: "RandomSizedCrop",
    description: "Crop a random part of the input and rescale it to some size.",
    parameters:
      '[{"name":"min_max_height","type":"[int, int]","description":"crop size limits.","min":1, "max": "h"},{"name":"height","type":"int","description":"height after crop and resize."},{"name":"width","type":"int","description":"width after crop and resize.","min":1, "max": "w"},{"name":"w2h_ratio","type":"float","description":"aspect ratio of crop.","defaultVal":1},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","defaultVal":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","defaultVal":1}]',
    category: 1,
  },
  {
    id: 64,
    name: "LongestMaxSize",
    description:
      "Rescale an image so that maximum side is equal to max_size, keeping the aspect ratio of the initial image.",
    parameters:
      '[{"name":"max_size","type":"int","description":"maximum size of the image after the transformation.","defaultVal":1024},{"name":"interpolation","type":"OpenCV flag","description":"interpolation method. Default: cv2.INTER_LINEAR.","defaultVal":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","defaultVal":1}]',
    category: 2,
  },
  {
    id: 65,
    name: "RandomScale",
    description:
      "Randomly resize the input. Output image size is different from the input image size.",
    parameters:
      '[{"name":"scale_limit","type":"[float, float] or float","description":"scaling factor range. If scale_limit is a single float value, the range will be (1 - scale_limit, 1 + scale_limit). Default: (0.9, 1.1).","defaultVal":0.1},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","defaultVal":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 2,
  },
  {
    id: 66,
    name: "Resize",
    description: "Resize the input to the given height and width.",
    parameters:
      '[{"name":"height","type":"int","description":"desired height of the output.","min":1, "max": 1024},{"name":"width","type":"int","description":"desired width of the output.","min":1, "max": 1024},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","defaultVal":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","defaultVal":1}]',
    category: 2,
  },
  {
    id: 67,
    name: "SmallestMaxSize",
    description:
      "Rescale an image so that minimum side is equal to max_size, keeping the aspect ratio of the initial image.",
    parameters:
      '[{"name":"max_size","type":"int","description":"maximum size of smallest side of the image after the transformation.","defaultVal":1024},{"name":"interpolation","type":"OpenCV flag","description":"interpolation method. Default: cv2.INTER_LINEAR.","defaultVal":1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.","defaultVal":1}]',
    category: 2,
  },
  {
    id: 68,
    name: "RandomRotate90",
    description: "Randomly rotate the input by 90 degrees zero or more times.",
    parameters:
      '[{"name":"p","type":"float","description":"probability of applying the transform. ","defaultVal":0.5},{"name":"factor","type":"int","description":"number of times the input will be rotated by 90 degrees.","defaultVal":null}]',
    category: 3,
  },
  {
    id: 69,
    name: "Rotate",
    description:
      "Rotate the input by an angle selected randomly from the uniform distribution.",
    parameters:
      '[{"name":"limit","type":"[int, int] or int","description":"range from which a random angle is picked. If limit is a single int an angle is picked from (-limit, limit). Default: (-90, 90)","defaultVal":90},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","defaultVal":1},{"name":"border_mode","type":"OpenCV flag","description":"flag that is used to specify the pixel extrapolation method. Should be one of: cv2.BORDER_CONSTANT, cv2.BORDER_REPLICATE, cv2.BORDER_REFLECT, cv2.BORDER_WRAP, cv2.BORDER_REFLECT_101. Default: cv2.BORDER_REFLECT_101","defaultVal":4},{"name":"value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT."},{"name":"mask_value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT applied for masks."},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 3,
  },
  {
    id: 70,
    name: "ElasticTransform",
    description:
      "Elastic deformation of images as described in [Simard2003]_ (with modifications). Based on https://gist.github.com/erniejunior/601cdf56d2b424757de5",
    parameters:
      '[{"name":"alpha","type":"float","description":null,"defaultVal":1,"min":0,"max":10},{"name":"sigma","type":"float","description":"Gaussian filter parameter.","defaultVal":50},{"name":"alpha_affine","type":"float","description":"The range will be (-alpha_affine, alpha_affine)","defaultVal":50},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","defaultVal":1},{"name":"border_mode","type":"OpenCV flag","description":"flag that is used to specify the pixel extrapolation method. Should be one of: cv2.BORDER_CONSTANT, cv2.BORDER_REPLICATE, cv2.BORDER_REFLECT, cv2.BORDER_WRAP, cv2.BORDER_REFLECT_101. Default: cv2.BORDER_REFLECT_101","defaultVal":4},{"name":"value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT.","min":0,"max":255},{"name":"mask_value","type":"int, float, list of ints, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT applied for masks."},{"name":"approximate","type":"boolean","description":"Whether to smooth displacement map with fixed kernel size. Enabling this option gives ~2X speedup on large images.","defaultVal":"False"}]',
    category: 4,
  },
  {
    id: 72,
    name: "ShiftScaleRotate",
    description:
      "Randomly apply affine transforms: translate, scale and rotate the input.",
    parameters:
      '[{"name":"shift_limit","type":"[float, float] or float","description":"shift factor range for both height and width. If shift_limit is a single float value, the range will be (-shift_limit, shift_limit). Absolute values for lower and upper bounds should lie in range [0, 1]. Default: (-0.0625, 0.0625).","defaultVal":0.0625,"min": 0, "max": 1},{"name":"scale_limit","type":"[float, float] or float","description":"scaling factor range. If scale_limit is a single float value, the range will be (-scale_limit, scale_limit). Default: (-0.1, 0.1).","defaultVal":0.1},{"name":"rotate_limit","type":"[int, int] or int","description":"rotation range. If rotate_limit is a single int value, the range will be (-rotate_limit, rotate_limit). Default: (-45, 45).","defaultVal":45},{"name":"interpolation","type":"OpenCV flag","description":"flag that is used to specify the interpolation algorithm. Should be one of: cv2.INTER_NEAREST, cv2.INTER_LINEAR, cv2.INTER_CUBIC, cv2.INTER_AREA, cv2.INTER_LANCZOS4. Default: cv2.INTER_LINEAR.","defaultVal":1},{"name":"border_mode","type":"OpenCV flag","description":"flag that is used to specify the pixel extrapolation method. Should be one of: cv2.BORDER_CONSTANT, cv2.BORDER_REPLICATE, cv2.BORDER_REFLECT, cv2.BORDER_WRAP, cv2.BORDER_REFLECT_101. Default: cv2.BORDER_REFLECT_101","defaultVal":4},{"name":"value","type":"int, float, list of int, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT."},{"name":"mask_value","type":"int, float, list of int, list of float","description":"padding value if border_mode is cv2.BORDER_CONSTANT applied for masks."},{"name":"shift_limit_x","type":"[float, float] or float","description":"shift factor range for width. If it is set then this value instead of shift_limit will be used for shifting width. If shift_limit_x is a single float value, the range will be (-shift_limit_x, shift_limit_x). Absolute values for lower and upper bounds should lie in the range [0, 1]. Default: None.","min": 0, "max": 1},{"name":"shift_limit_y","type":"[float, float] or float","description":"shift factor range for height. If it is set then this value instead of shift_limit will be used for shifting height. If shift_limit_y is a single float value, the range will be (-shift_limit_y, shift_limit_y). Absolute values for lower and upper bounds should lie in the range [0, 1]. Default: None.","min": 0, "max": 1},{"name":"p","type":"float","description":"probability of applying the transform. Default: 1.0.","defaultVal":1.0}]',
    category: 4,
  },
];

export default augmentations;

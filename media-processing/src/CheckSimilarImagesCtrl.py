import cv2
import numpy as np

import cv2

def compare_images_with_perspective(image1, image2):

    # Преобразование изображений в черно-белый формат
    gray_image1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
    gray_image2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)

    # Инициализация детектора и описателя SIFT
    sift = cv2.SIFT_create()

    # Нахождение ключевых точек и их описателей
    keypoints1, descriptors1 = sift.detectAndCompute(gray_image1, None)
    keypoints2, descriptors2 = sift.detectAndCompute(gray_image2, None)

    # Использование BFMatcher для нахождения соответствий
    bf = cv2.BFMatcher()
    matches = bf.knnMatch(descriptors1, descriptors2, k=2)

    # Применение меры лавенштейна для фильтрации соответствий
    good_matches = []
    for m, n in matches:
        if m.distance < 0.75 * n.distance:
            good_matches.append(m)

    if len(good_matches)/len(matches) < 100: return True
    else: return False

        
def checkSimilarity(new_image_file, old_image_paths: list):
    # new_image_np = np.frombuffer(new_image_file.read(), np.uint8)
    new_image = cv2.imdecode(new_image_file, cv2.IMREAD_COLOR)
    h, w = new_image.shape[0], new_image.shape[1]
    for old_img_path in old_image_paths:
        old_img = cv2.imread(old_img_path)
        if compare_images_with_perspective(new_image, old_img):
            return True
    return False
    
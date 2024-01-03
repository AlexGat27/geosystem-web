import cv2
import numpy as np

#Функция вычисления хэша
def __CalcImageHash(image):
    resized = cv2.resize(image, (16,16), interpolation = cv2.INTER_AREA) #Уменьшим картинку
    gray_image = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY) #Переведем в черно-белый формат
    avg=gray_image.mean() #Среднее значение пикселя
    ret, threshold_image = cv2.threshold(gray_image, avg, 255, 0) #Бинаризация по порогу
    
    #Рассчитаем хэш
    _hash=""
    for x in range(16):
        for y in range(16):
            val=threshold_image[x,y]
            if val==255:
                _hash=_hash+"1"
            else:
                _hash=_hash+"0"
            
    return _hash

def __CompareHash(hash1,hash2):
    l=len(hash1)
    i=0
    count=0
    while i<l:
        if hash1[i]!=hash2[i]:
            count=count+1
        i=i+1
    return count/l

def __cropImage(img, cropCoef):
    cropImg = img
    return cropImg
        
def checkSimilarity(new_image_file, old_image_paths: list):
    # new_image_np = np.frombuffer(new_image_file.read(), np.uint8)
    new_image = cv2.imdecode(new_image_file, cv2.IMREAD_COLOR)
    h, w = new_image.shape[0], new_image.shape[1]
    for old_img_path in old_image_paths:
        old_image = cv2.imread(old_img_path)
        old_img_hash = __CalcImageHash(old_image)
        for angle in range(0, 360, 45):
            matrix_rotation = cv2.getRotationMatrix2D(center=(w/2, h/2), angle=angle, scale=1)
            new_img_hash = __CalcImageHash(cv2.warpAffine(new_image, matrix_rotation, (w,h)))
            similarResult = __CompareHash(new_img_hash, old_img_hash)
            print("Result: ", similarResult)
            print("Angle: ", angle)
            if similarResult < 0.3:
                return True
    return False
    
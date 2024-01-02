import cv2
import numpy as np

#Функция вычисления хэша
def __CalcImageHash(image):
    resized = cv2.resize(image, (32,32), interpolation = cv2.INTER_AREA) #Уменьшим картинку
    gray_image = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY) #Переведем в черно-белый формат
    avg=gray_image.mean() #Среднее значение пикселя
    ret, threshold_image = cv2.threshold(gray_image, avg, 255, 0) #Бинаризация по порогу
    
    #Рассчитаем хэш
    _hash=""
    for x in range(32):
        for y in range(32):
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
        
def checkSimilarity(new_image_file, old_image_paths: list):
    # new_image_np = np.frombuffer(new_image_file.read(), np.uint8)
    new_image = cv2.imdecode(new_image_file, cv2.IMREAD_COLOR)
    new_img_hash = __CalcImageHash(new_image)
    print("new_image_hash: ", new_img_hash)
    for img_path in old_image_paths:
        old_image = cv2.imread(img_path)
        old_img_hash = __CalcImageHash(old_image)
        similarResult = __CompareHash(new_img_hash, old_img_hash)
        print("Old_image_hash: ", old_img_hash)
        print("Result: ", similarResult)
        if similarResult < 0.2:
            return False
    return True
    
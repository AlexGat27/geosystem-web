import cv2
from ultralytics import YOLO
import random
from datetime import datetime
import numpy as np
from PIL import Image
from io import BytesIO
from torchvision.transforms import ToTensor, Compose
from .Database import Database

__support_img_ext = ['bmp', 'dng', 'jpeg', 'jpg', 'mpo', 'png', 'tif', 'tiff', 'webp', 'pfm', 'JPG'] 
__support_vid_ext = ['asf', 'avi', 'gif', 'm4v', 'mkv', 'mov', 'mp4', 'mpeg', 'mpg', 'ts', 'wmv', 'webm']
__support_model_ext = ['torchscript', 'pt', 'onnx', 'engine', 'mlmodel', 'pb', 'tflite']
#Рандомные улицы
__street = ['Ushakova', 'Kirovogradskaia', 'Naximova', 'Zakamskaia', 'Ribalko', 'Astraxanskaia']

model = YOLO('../Yolo_model/HolesChecker_1class.pt')
database = Database()
nametable = "pothole"

    #Основной процесс обработки видео, записи стопкадров в папку Media/{nametable} и координат в таблицу
# def videoProcessing(video_path):
#     if video_path.split('.')[-1] in __support_vid_ext:
#         cap = cv2.VideoCapture(video_path)
#         name_folder = os.path.join(os.path.abspath(os.getcwd()), "Media", nametable)
#         if not(os.path.exists(name_folder)):
#             os.mkdir(name_folder)
#         ids = []
#         while cap.isOpened():
#             _, frame = cap.read()
#             if _:
#                 results = model.track(frame, persist = True)[0]
#                 if results.boxes.id is not None:
#                     boxes_data = results.boxes.data.cpu().numpy()
#                     boxes = np.asarray([box[:4] for box in boxes_data], dtype=int)
#                     confidence = [conf[4] for conf in boxes_data]
#                     for id in results.boxes.id.cpu().numpy().astype(int):
#                         if id not in ids: 
#                             ids.append(id)
#                             time_detect = datetime.today()
#                             database.insert_to_table(nametable,time_detect, random.choice(__street),
#                                                       random.uniform(3360000, 3400000), random.uniform(8370000, 8400000), random.randint(1,4))
#                             name_file = "Annotated_" + video_path.split('/')[-1].split('.')[0] + '_' + str(id) + '.jpg'
#                             tofile_path = os.path.join(name_folder, name_file)
#                             for box, conf in zip(boxes, confidence):
#                                 frame = cv2.rectangle(frame, (box[0], box[1]), (box[2], box[3]), (0, 255, 0), 2)
#                                 frame = cv2.putText(frame, f"Conf {conf:0.2f}", (box[0], box[1]),
#                                                          cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)
#                             cv2.imwrite(tofile_path, frame)
#             else:
#                 break
#         cap.release()
#         return len(ids)

#Основной процесс обработки фото, записи фотографии в папку Media/{nametable} и координат в таблицу
def imageProcessing(file):
    potholesData = []

    image_np = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

    h, w, _ = image.shape

    image = cv2.resize(image, (640, 640))
    tensor_image = ToTensor()(image).unsqueeze(0)
    result = model(tensor_image)[0]
    for i in range(len(result.boxes)):
        time_detect = datetime.today()
        potholesData.append({
            "nametable": nametable,
            "street": random.choice(__street),
            "lat": random.uniform(3360000, 3400000),
            "lon": random.uniform(8370000, 8400000),
            "class": random.randint(1,4)
        })
        # database.insert_to_table(nametable, time_detect, random.choice(__street),
        #                           random.uniform(3360000, 3400000), random.uniform(8370000, 8400000), random.randint(1,4))
    annotated_frame = result.plot()
    annotated_frame = cv2.resize(annotated_frame, (w, h))

    retval, buffer = cv2.imencode('.jpg', annotated_frame)
    output_buffer = buffer.tobytes()
    return output_buffer, potholesData
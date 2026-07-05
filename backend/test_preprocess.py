import cv2
import numpy as np

# Create a mock isolated foot image
mask = np.zeros((100, 100), dtype=np.uint8)
cv2.circle(mask, (50, 50), 30, 255, -1)
foot = np.random.randint(100, 200, (100, 100), dtype=np.uint8)
isolated = cv2.bitwise_and(foot, foot, mask=mask)

isolated_gray = isolated.copy()
equalized = cv2.equalizeHist(isolated_gray)
colored = cv2.applyColorMap(equalized, cv2.COLORMAP_OCEAN)

print("Background pixel in isolated:", isolated_gray[0, 0])
print("Background pixel in equalized:", equalized[0, 0])
print("Background pixel in colored:", colored[0, 0])


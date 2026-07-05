import torch
import timm

print("Loading model...")
model = timm.create_model("deit_small_patch16_224", pretrained=False, num_classes=2)

try:
    model.load_state_dict(torch.load("deit_thermo_model.pth", map_location="cpu"))
    print("deit_small loaded successfully.")
except Exception as e:
    print("deit_small failed:", e)


import type { PixelCrop } from "react-image-crop"

// 这个函数用于将裁剪后的图像绘制到 canvas 上
export function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0,
) {
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    throw new Error("No 2d context")
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  // 设置 canvas 的宽度和高度
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height

  // 清除 canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  // 保存当前状态
  ctx.save()

  // 将画布原点移到中心点
  ctx.translate(canvasWidth / 2, canvasHeight / 2)
  ctx.rotate((rotate * Math.PI) / 180)
  ctx.scale(scale, scale)
  ctx.translate(-canvasWidth / 2, -canvasHeight / 2)

  // 计算裁剪区域的实际尺寸
  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY
  const cropWidth = crop.width * scaleX
  const cropHeight = crop.height * scaleY

  // 计算缩放比例以适应 canvas
  const ratio = Math.min(canvasWidth / cropWidth, canvasHeight / cropHeight)

  // 计算绘制尺寸
  const drawWidth = cropWidth * ratio
  const drawHeight = cropHeight * ratio

  // 计算绘制位置，使图像居中
  const drawX = (canvasWidth - drawWidth) / 2
  const drawY = (canvasHeight - drawHeight) / 2

  // 绘制图像
  ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, drawX, drawY, drawWidth, drawHeight)

  // 恢复之前的状态
  ctx.restore()

  // 添加白色背景（法国签证照片通常要求白色背景）
  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
  const data = imageData.data

  // 将透明像素替换为白色
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 255) {
      data[i] = 255 // red
      data[i + 1] = 255 // green
      data[i + 2] = 255 // blue
      data[i + 3] = 255 // alpha
    }
  }

  ctx.putImageData(imageData, 0, 0)
}

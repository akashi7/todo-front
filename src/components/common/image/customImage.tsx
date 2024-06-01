import { Image } from 'antd'
import { CSSProperties } from 'react'

interface CustomImageProps {
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  preview?: boolean
  placeholder?: string
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  preview,
  placeholder,
  className,
  style,
  onClick,
}) => {
  return (
    <Image
      onClick={onClick}
      style={style}
      src={
        src ||
        'https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg'
      }
      alt={alt || ''}
      width={width}
      height={height}
      preview={!!preview}
      placeholder={placeholder || ''}
      className={className}
    />
  )
}

export default CustomImage

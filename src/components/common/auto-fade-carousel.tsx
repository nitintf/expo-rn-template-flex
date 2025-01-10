import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {
  Animated,
  Dimensions,
  ImageSourcePropType,
  ImageStyle,
  View,
  ViewStyle,
} from "react-native"

interface AutoFadeCarouselProps {
  images: ImageSourcePropType[]
  fadeDuration?: number
  stillDuration?: number
}

const { width, height } = Dimensions.get("screen")

const AutoFadeCarousel = ({
  images,
  fadeDuration = 1000,
  stillDuration = 2000,
}: AutoFadeCarouselProps) => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [nextIdx, setNextIdx] = useState(1)

  // Opacity values for the current and next images
  const currentOpacity = useRef(new Animated.Value(1)).current
  const nextOpacity = useRef(new Animated.Value(0)).current

  // Helper function to get the animated value
  const getAnimatedValue = (value: Animated.Value) => {
    return JSON.parse(JSON.stringify(value))
  }

  const { images1, images2 } = useMemo(() => {
    const images1: ImageSourcePropType[] = []
    const images2: ImageSourcePropType[] = []

    images.forEach((image, index) => {
      if (index % 2 === 0) {
        images1.push(image)
      } else {
        images2.push(image)
      }
    })

    return { images1, images2 }
  }, [images])

  // Function to swap images
  const swapImages = useCallback(() => {
    const newCurrentOpacity = getAnimatedValue(currentOpacity) === 1 ? 0 : 1
    const newNextOpacity = getAnimatedValue(nextOpacity) === 1 ? 0 : 1

    Animated.parallel([
      Animated.timing(currentOpacity, {
        toValue: newCurrentOpacity,
        duration: fadeDuration,
        useNativeDriver: true,
      }),
      Animated.timing(nextOpacity, {
        toValue: newNextOpacity,
        duration: fadeDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After the animation, update the indexes for the next transition
      if (newCurrentOpacity === 1) {
        // Current image is now faded out, so update its index
        setNextIdx((prevIdx) => (prevIdx + 1) % images2.length)
      } else {
        // Next image is now faded out, so update its index
        setCurrentIdx((prevIdx) => (prevIdx + 1) % images1.length)
      }
    })
  }, [currentOpacity, fadeDuration, images1.length, images2.length, nextOpacity])

  // Start the auto-transition
  useEffect(() => {
    const interval = setInterval(swapImages, stillDuration + fadeDuration)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [fadeDuration, stillDuration, swapImages])

  return (
    <View style={$containerStyles}>
      {/* Current Image */}
      <Animated.Image
        source={images1[currentIdx]}
        style={[$imageStyles, { opacity: currentOpacity }]}
      />

      {/* Next Image */}
      <Animated.Image source={images2[nextIdx]} style={[$imageStyles, { opacity: nextOpacity }]} />
    </View>
  )
}

const $containerStyles: ViewStyle = {
  flex: 1,
  width: "auto",
}

const $imageStyles: ImageStyle = {
  height,
  resizeMode: "cover",
  width,
  position: "absolute",
}

export default AutoFadeCarousel

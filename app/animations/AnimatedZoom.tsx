import { useSpring, animated, useInView } from '@react-spring/web';

const AnimatedZoom = ({ children }) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0.5,
        scale: 0.5
      },
      to: {
        opacity: 1,
        scale: 1,
        x: 0
      }
    }),
    {
      rootMargin: '-20% 0%',
      once: false,
    }
  )
  return (
    <animated.div style={springs} ref={ref} >
     {children}
    </animated.div>
  );
};

export default AnimatedZoom;

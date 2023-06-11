import { useSpring, animated, useInView } from "@react-spring/web";

const AnimatedRight = ({ children }) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        x: 200,
      },
      to: {
        opacity: 1,
        delay: 200,
        x: 0,
      },
    }),
    {
      rootMargin: "20% 0%",
      once: false,
    }
  );
  return (
    <animated.div style={springs} ref={ref}>
      {children}
    </animated.div>
  );
};

export default AnimatedRight;

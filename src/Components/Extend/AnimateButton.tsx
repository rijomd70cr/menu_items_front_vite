import { motion, useCycle } from 'framer-motion';

type TypeType = 'slide' | 'scale' | 'rotate';
type TypeDirection = 'up' | 'down' | 'left' | 'right';

export type TypeAnimateButton = {
  children?: React.ReactElement,
  type?: TypeType,
  direction?: TypeDirection,
  offset?: number,
  scale?: any
}

export const AnimateButton = (props: TypeAnimateButton) => {
  let { children, type = 'scale', direction = 'right', offset = 10, scale = { hover: 1, tap: 0.9 } } = props;

  let offset1;
  let offset2;

  switch (direction) {
    case 'up':
    case 'left':
      offset1 = offset;
      offset2 = 0;
      break;
    case 'right':
    case 'down':
    default:
      offset1 = 0;
      offset2 = offset;
      break;
  }

  const [x, cycleX] = useCycle(offset1, offset2);
  const [y, cycleY] = useCycle(offset1, offset2);

  switch (type) {

    case 'rotate':
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 2,
            repeatDelay: 0
          }}
        >
          {children}
        </motion.div>
      );

    case 'slide':
      if (direction === 'up' || direction === 'down') {
        return (
          <motion.div animate={{ y: y !== undefined ? y : '' }} onHoverEnd={() => cycleY()} onHoverStart={() => cycleY()}>
            {children}
          </motion.div>
        );
      }
      return (
        <motion.div animate={{ x: x !== undefined ? x : '' }} onHoverEnd={() => cycleX()} onHoverStart={() => cycleX()}>
          {children}
        </motion.div>
      );

    case 'scale':
    default:
      if (typeof scale === 'number') {
        scale = { hover: scale, tap: scale };
      }

      return (
        <motion.div whileHover={{ scale: scale?.hover }} whileTap={{ scale: scale?.tap }}>
          {children}
        </motion.div>
      );
  }
};

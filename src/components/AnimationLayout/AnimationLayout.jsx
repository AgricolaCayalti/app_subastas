import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { PageLayout } from '../PageLayout/PageLayout';

const pageVariants = {
    initial: {
        opacity: 0
    },
    in: {
        opacity: 1
    },
    out: {
        opacity: 0
    }
};

const pageTransition = {
    type: 'spring',
    damping: 10,
    stiffness: 100
}; 

export const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
        style={{height: "100%"}}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};
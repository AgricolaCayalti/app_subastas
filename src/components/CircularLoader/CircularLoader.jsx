import React from 'react';
import { FaSpinner as SpinnerIcon } from 'react-icons/fa';
import styles from './CircularLoader.module.css';

export const CircularLoader= ({...props}) =>  <SpinnerIcon {...props} className={styles.spinnerIcon} />
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export const getUserId = () => {
  // Check localStorage for short circuit
  const storedUserId = localStorage.getItem('userId');

  if (storedUserId) {
    return storedUserId;
  } else {
    // Otherwise, generate a new userId, store in localStorage, and return
    const newUserId = `guest_${uuidv4()}`;
    localStorage.setItem('userId', newUserId);
    return newUserId;
  }
};

export const notifyInteractionSuccess = () => {
  return toast.success('Suvery was successfully submitted!', {
    autoClose: 3000,
    theme: 'dark',
  });
}



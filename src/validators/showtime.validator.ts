import { body } from 'express-validator';

export const createShowtimeValidator = [
  body('movieId').isMongoId().withMessage('Invalid Movie ID format'),
  body('hallNumber').isInt({ min: 1 }).withMessage('Hall number must be a positive integer'),
  body('date')
    .isISO8601()
    .toDate()
    .custom((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (value < today) {
        throw new Error('Showtimes must be scheduled for future dates only');
      }
      return true;
    }),
  body('startTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format (e.g. 18:30)'),
  body('endTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:MM format (e.g. 20:30)'),
  body('ticketPrice').isFloat({ min: 0 }).withMessage('Ticket price must be a positive number'),
  body('totalCapacity').isInt({ min: 1 }).withMessage('Total capacity must be at least 1'),
];
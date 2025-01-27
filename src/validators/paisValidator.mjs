import { body } from 'express-validator'

export const paisValidation = () => [
    body('name.nativeName.spa.official').notEmpty().withMessage('El nombre del país es requerido').trim().isLength({ min: 3, max: 90 }).withMessage('El nombre del pais debe tener como mínimo 3 caracteres y máximo 90'),

    body('capital.*').notEmpty().withMessage('Debe indicar la capital').trim().isLength({ min: 3, max: 90 }).withMessage('La capital debe tener como minimo 3 caracteres y maximo 90'),

    body('borders.*').isString().withMessage('Cada elemento debe ser un string').isLength({ min: 3, max: 3 }).withMessage('Cada país de frontera debe tener exactamente 3 caracteres').toUpperCase(),
    body('area').trim().isNumeric({ min: 0 }).withMessage('Área debe ser un número positivo'),

    body('population').trim().isInt({ min: 0 }).withMessage('Población debe ser un número entero positivo'),
    
]
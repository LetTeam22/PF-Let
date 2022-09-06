const { User, Bike, Booking, Accesories,Experience} = require('../db');
const { Op } = require("sequelize");

async function getAllBookings(req, res, next) {
  try {
    let bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ['userName'],
        }, 
        {
          model: Bike,
          attributes: ['name'],
          through: {
            attributes: []
          }
        },
        {
          model: Accesories,
          attributes: ['name'],
          through: {
            attributes: []
          }
        } 
      ]
    })
    bookings.sort((a, b) => a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0)
    bookings.sort((a, b) => a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0)
    res.send(bookings)
  } catch (error) {
    next(error)
  }
}

async function getBookingsByUserId(req, res, next) {
  const { userId } = req.params
  if (!userId) return res.sendStatus(400)
  try {
    let bookings = await Booking.findAll({
      where: { userIdUser: userId },
      include: [
        {
          model: Bike,
          attributes: ['name'],
          through: {
            attributes: []
          }
        },
        {
          model: Accesories,
          attributes: ['name'],
          through: {
            attributes: []
          }
        } 
      ]
    })
    if (!bookings.length) return res.send({ msg:'This user has no bookings' })
    bookings.sort((a, b) => a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0)
    bookings.sort((a, b) => a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0)
    res.send(bookings)
  } catch (error) {
    next(error)
  }
}

async function getBookingsByBikeIds(req, res, next) {
  const { bikeIds } = req.params;
  if (!bikeIds) return []
  const arrBikeIds = bikeIds.split(',')
  try {
    const bikes = await Bike.findAll({
      where: { idBike: { [Op.or]: arrBikeIds } },
      include: {
        model: Booking,
        attributes: ['startDate', 'endDate', 'status'],
        through: { attributes: [] },
        where: { status: 'confirmed' }
      }
    })
    const disabledDates = []
    bikes.forEach(bike => bike.bookings.forEach(booking => disabledDates.push([booking.startDate, booking.endDate])))
    res.send(disabledDates)
  } catch (error) {
    next(error)
  }
}

async function postBooking(req, res, next) {
  const { startDate, endDate, userId, bikeIds, AccIds=[], totalPrice } = req.body
  if (!startDate || !endDate || !userId || !bikeIds.length || !totalPrice) return res.sendStatus(400)
  try {
    let booking = {startDate, endDate, userIdUser: userId, totalPrice: Number(totalPrice)}
    let bookingCreated = await Booking.create(booking)
    let bikes = await Bike.findAll({
      where: {
        idBike: bikeIds
      } 
    })
    let accesoriesForBooking = await Accesories.findAll({
      where: {
        idAcc: AccIds
      } 
    })
    await bookingCreated.addBike(bikes)
    await bookingCreated.addAccesories(accesoriesForBooking)
    res.send('The booking was created successfully')
  } catch (error) {
    next(error)
  }
}

async function cancelBooking(req, res, next) {
  const { bookingId } = req.params
  if (!bookingId) return res.sendStatus(400)
  try {
    let booking = await Booking.findByPk(bookingId)
    if (!booking) return res.send(`The booking with id ${bookingId} does not exist`)
    booking.update({ status: 'cancelled' })
    res.send(`The booking with id ${bookingId} was cancelled successfully`)
  } catch (error) {
    next(error)
  }
}


module.exports = {
  getAllBookings,
  getBookingsByUserId,
  getBookingsByBikeIds,
  postBooking,
  cancelBooking
}

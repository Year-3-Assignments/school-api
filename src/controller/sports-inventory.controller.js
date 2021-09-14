import SportsInventory from '../model/SportsInventory'
import responseHandler from '../response/response.handler';

    export async function createSportInventory(req, res, next) {
        let sportsInventory = new SportsInventory(req.body);
        await sportsInventory.save()
        .then((data) => {
            return res.status(200).json(data);
        })
        .catch(error => {
        return res.status(500).json(error.message);
        });
    }

    export async function getAllSportsInventory(req, res, next) {
        await SportsInventory.find({})
        .sort({ createdAt: -1 })
        .populate('sportname', '_id name coach ')
        .then((data) => {
          responseHandler.respond(res, data);
        })
        .catch((error) => {
            responseHandler.handleError(res, error.message);
        });
    }

    export async function updateSportInventory(req, res, next) {
        let sportsInventory = await SportsInventory.findById(req.params.id);
        if (!sportsInventory) {
          response.handleError(res, 'Sports Inventory not found');
          return;
        }
        let updateSportData = {
          name: req.body.name,
          sportname: req.body.sportname_id,
          dateOfPurchase: req.body.dateOfPurchase,
          quantity: req.body.quantity
        };
        await SportsInventory.findByIdAndUpdate(req.params.id, updateSportData)
        .then(data => {
            responseHandler.respond(res, data);
          return;
        })
        .catch(error => {
            responseHandler.handleError(res, error.message);
          return;
        });
    }
  
    export async function deleteSportInventory(req, res, next) {
        await SportsInventory.findByIdAndDelete(req.params.id)
        .then(data => {
            responseHandler.respond(res, data);
            return;
        })
        .catch(error => {
            responseHandler.handleError(res, error.message);
            return;
        });
    }
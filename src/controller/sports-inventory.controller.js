import SportsInventory from '../model/SportsInventory'

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
        await SportsInventory.findById(req.params.id)
        .sort({ createdAt: -1 })
        .populate('sportname', '_id name coach ')
        .then((data) => {
            response.sendRespond(res, data);
            return;
        })
        .catch(error => {
            response.handleError(res, error.message);
            return;
        });
    }

    export async function updateSportInventory(req, res, next) {
        let sportsInventory = await SportsInventory.findById(req.body._id);
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
        await SportsInventory.findByIdAndUpdate(req.body._id, updateSportData)
        .then(data => {
          response.sendRespond(res, data);
          return;
        })
        .catch(error => {
          response.handleError(res, error.message);
          return;
        });
    }
  
    export async function deleteSportInventory(req, res, next) {
        await SportsInventory.findByIdAndDelete(req.params.id)
        .then(data => {
            response.sendRespond(res, data);
            return;
        })
        .catch(error => {
            response.handleError(res, error.message);
            return;
        });
    }
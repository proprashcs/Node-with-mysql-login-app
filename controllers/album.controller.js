const { Album } = require('../models');
const { User } = require('../models');

const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    let err, album;
    let user = req.user;

    let album_info = req.body;

    [err, album] = await to(Album.create(album_info));
    if (err) return ReE(res, err, 422);

    [err, album] = await to(album.save());
    if (err) return ReE(res, err, 422);

    let album_json = album.toWeb();
    album_json.users = [{ user: user.id }];

    return ReS(res, { album: album_json }, 201);
}
module.exports.create = create;

const getAll = async function (req, res) {
    let user = req.user;
    let err, albums;

    [err, albums] = await to(Album.findAll({ include: [User] }));

    return ReS(res, { albums: albums });
}
module.exports.getAll = getAll;

const get = async function (req, res) {
    //let album = req.album;
    [err, album] = await to(Album.findOne({ where: { id: req.params.album_id } }));

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { album: album.toWeb() });
}
module.exports.get = get;

const update = async function (req, res) {
    let err, album, data;
    album = req.body;

    [err, album] = await to(Album.update(album, { where: { id: req.params.album_id } }));
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { album: album });
}
module.exports.update = update;

const remove = async function (req, res) {
    let album, err;
    album = req.album;

    [err, album] = await to(Album.destroy({ where: { id: req.params.album_id } }));
    if (err) return ReE(res, 'error occured trying to delete the Album');

    return ReS(res, { message: 'Deleted Album' }, 204);
}
module.exports.remove = remove;
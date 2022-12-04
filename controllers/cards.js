const Card = require("../models/card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: `произошла ошибка ${e}` });
  }
};

const postCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    await Card.create({ name, link, owner: req.user._id }).then((card) => {
      return res.status(201).json({ card });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: `произошла ошибка ${e}` });
  }
};
const deleteCard = async (req, res) => {
  try{
await Card.findByIdAndDelete({_id:req.params.cardId})
return res.status(200).json({message: "card delete"})
  }catch(e){
    console.error(e);
    return res.status(500).json({ message: `произошла ошибка ${e}` });
  }
};
const putLike = async (req,res)=>{
try{
  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card)=>{return res.status(200).json(card)})
}catch(e){
  console.error(e);
  return res.status(500).json({ message: `произошла ошибка ${e}` });
}
};
const deleteLike = async (req,res)=>{
try{
  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card)=>{return res.status(200).json(card)})
}catch(e){
  console.error(e);
  return res.status(500).json({ message: `произошла ошибка ${e}` });
}
}
module.exports = { getCards, postCard,deleteCard,putLike,deleteLike };

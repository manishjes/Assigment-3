module.exports = {
  //add items
  additems: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { itemname, description, price, category, displayOrder } = req.body;

      const items = await MenuItem.find({
        itemname: itemname,
        isDelete: false,
        
      });
      const itemorders = await MenuItem.find({
        displayOrder: displayOrder,
        isDelete:false,
        
      });

      //item name validation
      if (items.length != 0) {
        return res.status(404).json({ message: sails.__("item.exsits", { lang: lang }) });
      }

      //check display order validation
      
      if (itemorders.length != 0) {
        return res
          .status(404)
          .json({ message: `item order ${displayOrder} already exists` });
      }

      req.file("image").upload(
        {
          maxBytes: 10000000,
        },
        async (err, uploadedFiles) => {
          

          if (err) {
            return res.serverError(err);
          } else {
            if (uploadedFiles.length > 0) {
              const imageFd = await uploadedFiles[0].fd;

              try {
                //add new item
                const item = await MenuItem.create({
                  itemname: itemname,
                  description: description,
                  price: price,
                  category: category,
                  image: imageFd,
                  displayOrder: displayOrder,
                }).fetch();

                if (item) {
                  return res
                    .status(200)
                    .json({ message: sails.__("item.success", { lang: lang }), item: item });
                }
              } catch (error) {
                return res.json({
                  error: error + "hello",
                });
              }
            }
          }
        }
      );

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  //get all items
  items: async (req, res) => {
   const lang = req.getLocale();
 
    try {
      const items = await MenuItem.find({ isDelete: false });
      res
        .status(200)
        .json({ message: sails.__("item.total", { lang: lang }), count: items.length, item: items });
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: err });
    }
  },

  //update item
  updateItems: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { itemname, description, price, category, image, displayOrder } =
        req.body;
      const id = req.params.id;
      const items = await MenuItem.find({
        itemname: itemname,
        
      })
      
      
      // item name validation
      if (items.length != 0) {
        return res.status(404).json({ message: "item name already exists" });
      }
      else{
        // update the item
      const item = await MenuItem.updateOne({ id: id }).set(
        req.body);
        if(!item){
          res.status(404).json({message: "item not found"})

        }else{
          // return the updated item
      return res.status(200).json({ message: sails.__("item.update", { lang: lang }), item: item });

        }
    

      }
      
    } catch (error) {
      return res.status(500).json({ message: " error" });
     
    }
    
  },
  //delete items
  deleteitem: async (req, res) => {
    const lang = req.getLocale();
    try {
      const id = req.params.id;
      const items = await MenuItem.updateOne(id, {
        isDelete: true,
        deletedAt: new Date(),
      });
  if (!items) {
    return res.status(404).json({ error: 'item not found' });
  }
  return res.status(200).json({
    message: sails.__("item.deleted"),
    category: items,
  })
} catch (err) {
  return res.status(500).json({ error: err.message });
}
},
};

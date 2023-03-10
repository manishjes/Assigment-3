module.exports = {
  //add items
  additems: async (req, res) => {
    try {
      const { itemname, description, price, category, displayOrder } = req.body;

      const items = await MenuItem.find({
        itemname: itemname,
        category: category,
      });
      const itemorders = await MenuItem.find({
        displayOrder: displayOrder,
        category: category,
      });

      //item name and category validation
      if (items.length != 0) {
        return res.status(404).json({ message: "item name already exists" });
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
                    .json({ message: "success", item: item });
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
    try {
      const items = await MenuItem.find({ isDelete: false });
      res
        .status(200)
        .json({ message: "total item", count: items.length, item: items });
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: err });
    }
  },

  //update item
  updateItems: async (req, res) => {
    try {
      const { itemname, description, price, category, image, displayOrder } =
        req.body;
      const id = req.params.id;
      const items = await MenuItem.find({
        itemname: itemname,
        category: category,
      });
      const itemorders = await MenuItem.find({
        displayOrder: displayOrder,
        category: category,
      });

      // item name and category validation
      if (items.length != 0) {
        return res.status(404).json({ message: "item name already exists" });
      }

      // displayOrder and category validation
      if (itemorders.length != 0) {
        return res
          .status(404)
          .json({ message: `item order ${displayOrder} already exists` });
      }

      // update the item
      const item = await MenuItem.updateOne({ id: id }).set({
        itemname: itemname,
        description: description,
        price: price,
        category: category,
        image: image,
        displayOrder: displayOrder,
        updatedAt: new Date(),
      });

      // return the updated item
      return res.status(200).json({ message: "success", item: item });
    } catch (error) {
      return res.status(500).json({ message: " error" });
    }
  },
  //delete items
  deleteitem: async (req, res) => {
    try {
      const id = req.params.id;
      const items = await MenuItem.update(id, {
        isDelete: true,
        deletedAt: new Date(),
      });
      res.status(200).json({ message: "success deleted", items });
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: err.message });
    }
  },
};

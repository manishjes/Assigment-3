
module.exports = {
  
  //add category
  addcategory: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { name } = req.body;
      const category = await MenuCategory.find({ name: name, isDelete: false });
      //category name validation
      if (category.length != 0) {
        res.status(400).json({ message: "category already exists" });
      } else {
        //create a category
        const addcategory = await MenuCategory.create({ name: name }).fetch();
        if (addcategory) {
          console.log(addcategory);
          res.status(200).json({  message: sails.__("category.addsuccess", { lang: lang }), category: addcategory });
        } else {
          res.status(404).json({ message: "category not found" });
        }
      }
    } catch (err) {
      res.status(500).json({ message: "error", error: err.message });
    }
  },  

  //pagination for category and items 
  
  category: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const pagelimit = parseInt(limit);
      let skip = 0;
      if (page && !isNaN(page)) {
        skip = (parseInt(page) - 1) * pagelimit;
      }
      if (limit) {
        let category = await MenuCategory.find({ isDelete: false })
          .skip(skip)
          .limit(pagelimit)
          .populate(
            "items",
            { where: { isDelete: false } },
            { sort: "displayOrder ASC" }
          );
        category = {
          pageNumber: page,
          limit: category.length,
          category: category.map((category) => ({
            id: category.id,
            name: category.name,
            totalitems: category.items.length,
            items: category.items,
          })),
        };
        console.log(category);
        res.status(200).json({ category });
      }
      else {
        //filtering category
        const search =   req.query.search;
        console.log("search", search);
        if (!search) {
          const category = await MenuCategory.find({ isDelete: false })
            .populate(
              "items",
              { where: { isDelete: false } },
              { sort: "displayOrder ASC" }
            );
          const allcategory = {
            pageNumber: page,
            limit: category.length,
            count: category.length,
            category: category.filter((category) => {
              return {
                id: category.id,
                name: category.name,
                totalitems: category.items.length,
                items: category.items,
              };
            }),
          };
          res.status(200).json(allcategory);
        } else {
          //search function
          const categorysearch = await MenuCategory.find({
            isDelete: false,
            name: { contains: search },
            
            
          });
          console.log(categorysearch);
          res.status(200).json({ category: categorysearch });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: " Error" });
    }
  },
 
  
  
  


  
  // update category name
  updatecategory: async (req, res) => {
    const lang = req.getLocale();
    try {
      const id = req.params.id;
      const { name } = req.body;
      const category = await MenuCategory.find({ name: name, isDelete: false });
      //category name validation
      if (category.length != 0) {
        res.status(400).json({ message: "category already exists" });
      } else {
        //update a category
        const updatedCategory = await MenuCategory.updateOne({ id }).set({
          name: name,
          updatedAt: new Date(),
        });
        if (updatedCategory) {
          res.status(200).json({  message: sails.__("category.update", { lang: lang }), category: updatedCategory });
        } else {
          res.status(404).json({ message: "failed to update" });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: err.message });
    }
  },
  //delete category

      deletecategory: async (req, res) =>{
        try {
          const deletedCategory = await MenuCategory.destroyOne(req.params.id);
          if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
          }
          return res.json(deletedCategory);
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      },

   
  //user dashboard for menu
  menu: async (req, res) => {
    try {
      const category = await MenuCategory.find({ isDelete: false })
        .populate(
          "items",
          { where: { isDelete: false } },
          { sort: "displayOrder ASC" }
        );
  
      if (category) {
        const result = {
          count: category.length,
          category: category.map((category) => {
            return {
              name: category.name,
              totalitems: category.items.length,
              items: category.items.map((item) => {
                return {
                  id: item.id,
                  itemname: item.itemname,
                  description: item.description,
                  price: item.price,
                  image: item.image,
                  displayOrder: item.displayOrder,
                };
              }),
            };
          }),
        };
        res.status(200).json(result);
      }
      console.log(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: " Error" });
    }
  },
};

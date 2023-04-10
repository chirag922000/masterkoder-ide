const mongoose = require('mongoose');

const pagecontent=mongoose.Schema({
  contentimg:{type:String},
  contenttext:{type:String},
  contentvideo:{type:String}
})


const topicSchema = mongoose.Schema({
  topictitle: { type: String },
  content:[pagecontent]
});

const accordionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  items: [topicSchema], 
});

module.exports = mongoose.model('Accordion', accordionSchema);

const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview=async(req,res,next)=>{
    let listing= await Listing.findById(req.params.id); 
    // Create a new review object from the submitted form data
    const newReview=new Review(req.body.review);
    console.log(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview);
    // Associate the review with the listing
    listing.reviews.push(newReview);
    // Save the review and update the listing
    await newReview.save();
    await listing.save();
    // Show Success Message and Redirect

    req.flash("success","New Review Created!");
    res.redirect(/listings/${listing._id});
}
module.exports.destroyReview=async(req,res,next)=>{
    let{id,reviewId}=(req.params);
    // Remove the review reference from the listing and delete the review
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    // Show success message and redirect
    req.flash("success","Review Deleted!");
    res.redirect(/listings/${id});
}

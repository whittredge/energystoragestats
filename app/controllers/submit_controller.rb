class SubmitController < ApplicationController
	def submit_data
	    doi = params[:doi]
	    link = params[:link]
	    email = params[:email]
	    comments = params[:comments]
	    SubmitMailer.submit_email(doi, link, email, comments).deliver
	    redirect_to root_path, notice: 'Data submitted'
	end
end
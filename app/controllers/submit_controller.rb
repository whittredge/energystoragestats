class SubmitController < ApplicationController
	def submit_data
	    name = params[:name]
	    email = params[:email]
	    body = params[:comments]
	    SubmitMailer.submit_email(name, email, body).deliver
	    redirect_to submit_path, notice: 'Data submitted'
	end
end
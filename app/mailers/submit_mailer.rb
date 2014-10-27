class SubmitMailer < ActionMailer::Base
    default to: 'whittredge@gmail.com'

    def submit_email(doi, link, email, comments)
        @doi = doi
        @link = link
        @email = email
        @comments = comments

        mail(from: email, subject: 'Data submission')
    end
end
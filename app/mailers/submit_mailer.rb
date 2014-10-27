class SubmitMailer < ActionMailer::Base
    default to: 'whittredge@gmail.com'

    def submit_email(name, email, body)
        @name = name
        @email = email
        @body = body

        mail(from: email, subject: 'Data submission')
    end
end
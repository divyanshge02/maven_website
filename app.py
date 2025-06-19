from flask import Flask, request, render_template, redirect, url_for, flash, send_from_directory, send_file
from flask_mail import Mail, Message
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', os.urandom(24))

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', 'mavenhospitalconsultant@gmail.com')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', 'jamm ncps umrm atni')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route for about page
@app.route('/about')
def about():
    return render_template('about.html')

# Route for services page
@app.route('/services')
def services():
    return render_template('services.html')

# Route for contact page
@app.route('/contact')
def contact():
    return render_template('contact.html')

# Route to handle form submission
@app.route('/submit', methods=['POST'])
def submit():
    try:
        # Get form data
        name = request.form.get('name')
        mobile = request.form.get('mobile')
        service = request.form.get('service')
        message = request.form.get('message', '')
        
        # Get conditional fields based on service type
        if service == 'Staff Recruitment':
            qualification = request.form.get('qualification')
            specialty = request.form.get('specialty', '')
            experience = request.form.get('experience')
            location = request.form.get('location')
            email = ''  # Not required for staff recruitment
            business_location = ''  # Not required for staff recruitment
        else:
            email = request.form.get('email')
            business_location = request.form.get('businessLocation')
            qualification = ''
            specialty = ''
            experience = ''
            location = ''
        
        # Get the uploaded file
        resume = request.files.get('resume')

        # Compose the email body
        body = f"""
        New Contact Form Submission from the Website
        
        Basic Information:
        Name/Organization: {name}
        Mobile: {mobile}
        Service Required: {service}
        Additional Details: {message}
        
        """
        
        if service == 'Staff Recruitment':
            body += f"""
        Job Application Details:
        Qualification: {qualification}
        Specialty/Department: {specialty}
        Experience: {experience}
        Preferred Location: {location}
        """
        else:
            body += f"""
        Business/Hospital Details:
        Email: {email}
        Location: {business_location}
        """

        # Create email message
        msg = Message(
            subject=f"New {service} Inquiry - {name}",
            sender=app.config['MAIL_USERNAME'],
            recipients=[app.config['MAIL_USERNAME']],
            body=body
        )

        # Attach PDF if present
        if resume and resume.filename:
            if resume.filename.endswith('.pdf'):
                msg.attach(resume.filename, 'application/pdf', resume.read())
            else:
                flash('Only PDF files are allowed for resume upload.', 'error')
                return redirect('/contact')

        # Send email
        mail.send(msg)
        flash('Thank you for your inquiry! Our team will contact you within 24 hours.', 'success')
        
    except Exception as e:
        print(f"Error sending email: {e}")
        flash('Sorry, there was an error sending your message. Please try again or call us directly.', 'error')
    
    return redirect('/contact')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
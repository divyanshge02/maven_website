from flask import Flask, request, render_template, redirect, flash
from flask_mail import Mail, Message
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', os.urandom(24))

# Configure Flask-Mail from environment variables
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', 'mavenhospitalconsultant@gmail.com')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', 'jamm ncps umrm atni')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/submit', methods=['POST'])
def submit():
    try:
        # Get form data
        name = request.form.get('name')
        mobile = request.form.get('mobile')
        service = request.form.get('service')
        message = request.form.get('message', '')
        
        if service == 'Staff Recruitment':
            qualification = request.form.get('qualification')
            specialty = request.form.get('specialty', '')
            experience = request.form.get('experience')
            location = request.form.get('location')
            email = ''
            business_location = ''
        else:
            email = request.form.get('email')
            business_location = request.form.get('businessLocation')
            qualification = ''
            specialty = ''
            experience = ''
            location = ''
        
        resume = request.files.get('resume')

        # Compose the email
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

        msg = Message(
            subject=f"New {service} Inquiry - {name}",
            sender=app.config['MAIL_USERNAME'],
            recipients=[app.config['MAIL_USERNAME']],
            body=body
        )

        if resume and resume.filename:
            if resume.filename.endswith('.pdf'):
                msg.attach(resume.filename, 'application/pdf', resume.read())
            else:
                flash('Only PDF files are allowed for resume upload.', 'error')
                return redirect('/contact')

        try:
            mail.send(msg)
            flash('Thank you for your inquiry! Our team will contact you within 24 hours.', 'success')
        except Exception as e:
            print(f"Flask-Mail error: {e}")
            flash('Failed to send email. Please try again later.', 'error')

    except Exception as e:
        print(f"General error: {e}")
        flash('An error occurred. Please try again.', 'error')

    return redirect('/contact')

# ❌ No app.run() needed — gunicorn handles this on Render

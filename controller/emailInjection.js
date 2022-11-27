const nodemailer = require(nodemailer);

// constructor for dealing email
/**
 * @param {user} user user refering to the center email address
 * @param {pass} pass service app generated verication code
 * @param {serviceName} service service name e.g gmail,yahoo,outlook etc
 * @param {template} template handle bat template to use
 * @param {target} target client email addtress
 */
class EmailInjection {
 constructor(user, pass, service, template, target, mailoptions) {
  this.user = user || process.env.EMAIL;
  this.pass = pass || process.env.PASS;
  this.service = service;
  this.template = template;
  this.target = target;
  this.mailotions = mailoptions;
 }

 get template() {
  if (this.template == undefined || this.template == null) {
   return new Error('template name must be provided');
  }

  if (typeof this.template == 'number') {
   throw new Error('string required')
  }

  if (this.template) {
   switch (this.template) {
    case ('invoice'):
     return {
      subject: 'Invoice - Laboratory test result invoice',
      template: 'invoice',
     };
     break
    case ('chemistry'):
     return {
      subject: 'Laboratory test Result [Chemistry]',
      template: 'chemistry'
     };
     break
    case ('Hematology'):
     return {
      subject: 'Laboratory test Result [Hematology]',
      template: 'chemistry'
     };
     break
    default:
     return 'default';
   }
  }

 }

 get isEmail() {
  // test if email is right 
  const regexTest = /^([w-]+(?:.[w-]+)*)@((?:[w-]+.)*w[w-]{0,66}).([com net org]{3}(?:.[a-z]{6})?)$/i

  let isValid = this.user.match(regexTest) == null ? false : true;
  return isValid;
 }

 get isValidOptions() {
  if (typeof this.mailotions != 'object') {
   throw new Error('Options must be an option ')
  }

  if (this.mailotions == undefined || this.mailotions == null) {
   throw new Error('Options must be provided')
  }

  if (this.mailotions) {
   const requiredKeys = ['subject', 'cc']
   const keys = Object.keys(this.mailotions)
   const isRequired = requiredKeys.every((key) => keys.includes(key))
   if (isRequired) {
    return true
   } else {
    throw new Error('Required keys are not provided')
   }
  }
 }

 createTransport() {
  const transporter = nodemailer.createTransport({
   service: this.service,
   auth: {
    user: this.user,
    pass: this.pass
   }
  });
  return transporter;
 }


 templateHandler() {
  const handlebarsOptions = {
   viewEngine: {
    extName: ".handlebars",
    partialDir: path.resolve("./views"),
    defaultLayout: false
   },
   viewPath: path.resolve("./views"),
   extName: '.handlebars'
  }
  return handlebarsOptions
 }


 mailOptionsHandler() {
  const mailOptions = {
   from: this.user,
   to: this.target,
   subject: this.mailotions.subject,
   cc: this.mailotions.cc,
   template: this.template(),
   context: {
    title: this.mailotions.title,
    age: this.mailotions.age,
    time: this.mailotions.time
   }
  }
  return mailOptions
 }


 sendMail(response) {
  if (this.isEmail() && this.isValidOptions()) {
   const transporter = this.createTransport();
   const handlebarsOptions = this.templateHandler();
   const mailOptions = this.mailOptionsHandler();
   transporter.use('compile', hbs(handlebarsOptions));
   transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
     console.log(err)
    }
    else {
     response.send(info.response)
    }
   })
  }
 }
}
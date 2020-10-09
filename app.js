
/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger Platform Quick Start Tutorial
 *
 * This is the completed code for the Messenger Platform quick start tutorial
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `npm install`
 * 3. Update the VERIFY_TOKEN
 * 4. Add your PAGE_ACCESS_TOKEN to your environment vars
 *
 */

'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
// Imports dependencies and set up http server
const 
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {  

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } else if (webhook_event.postback) {
        
        handlePostback(sender_psid, webhook_event.postback);
      }
      
    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {
  
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = "test_sahajjo_app";
  
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Check if a token and mode were sent
  if (mode && token) {
  
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

function handleMessage(sender_psid, received_message) {
  let response;
  
  // Checks if the message contains text
  if (received_message.text) {    

    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API

    //Send the button template if the user types any text to get them back to the main menu
    response = {
        "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
          {
            "title": "শ্রমিকের অধিকার",
            "subtitle": "Worker Rights",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "worker_rights",
              },
            ],
          },
          {
            "title": "কর্মী গতিশীলতা",
            "subtitle": "Worker Mobility",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "worker_mobility",
              },
            ],
          },
          {
            "title": "বেতন",
            "subtitle": "Salary",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "salary",
              },
            ],
          },
          {
            "title": "জীবন যাপনের অবস্থা",
            "subtitle": "Living Conditions",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "living_conditions",
              },
            ],
          }
          
          ]
        }
      }
    }
  }
  
  // Send the response message
  callSendAPI(sender_psid, response);    
}


function handlePostback(sender_psid, received_postback) {
  console.log('ok')
   let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // If the user selects the "Get_Started" button show them this menu of buttons
  if (payload == 'GET_STARTED') {

    response = {
        "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
          {
            "title": "শ্রমিকের অধিকার",
            "subtitle": "Worker Rights",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "worker_rights",
              },
            ],
          },
          {
            "title": "কর্মী গতিশীলতা",
            "subtitle": "Worker Mobility",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "worker_mobility",
              },
            ],
          },
          {
            "title": "বেতন",
            "subtitle": "Salary",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "salary",
              },
            ],
          },
          {
            "title": "জীবন যাপনের অবস্থা",
            "subtitle": "Living Conditions",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "living_conditions",
              },
            ],
          }
          
          ]
        }
      }
    }

    //If the user selects the Worker Mobility button, here is the worker mobility information

  } else if (payload === 'worker_mobility') {
    
    response = {
        "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
          {
            "title": "rejected passport transfer",
            "subtitle": "rejected passport transfer",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "rejected_passport_transfer",
              },
            ],
          },
          {
            "title": "permit expired",
            "subtitle": "permit expired",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "permit_expired",
              },
            ],
          },
          {
            "title": "travel to country",
            "subtitle": "travel to country",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "travel_to_country",
              },
            ],
          },
          {
            "title": "holiday to country",
            "subtitle": "holiday to country",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "holiday_to_country",
              },
            ],
          },
          {
            "title": "How to transfer",
            "subtitle": "how to transfer",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "how_to_transfer",
              },
            ],
          },
          {
            "title": "Go to country now",
            "subtitle": "Go to country now",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "go_to_country_now",
              },
            ],
          }
          
          ]
        }
      }
    }

    //If the user selects the salary button, here is the salary information

  } else if (payload === 'worker_rights') {
    
    response = {
        "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
          {
            "title": "Need passport back",
            "subtitle": "Need passport back",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "need_passport_back",
              },
            ],
          },
          {
            "title": "Passport coming?",
            "subtitle": "Is my passport coming?",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "passport_coming",
              },
            ],
          }
          ]
        }
      }
    }
    //If the user selects the salary button, here is the salary information

  } else if (payload === 'salary') {
    
    response = {
        "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
          {
            "title": "quarantine pay",
            "subtitle": "quarantine pay",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "quarantine_pay",
              },
            ],
          },
          {
            "title": "IP refund",
            "subtitle": "IP refund",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "ip_refund",
              },
            ],
          },
          {
            "title": "no salary",
            "subtitle": "no salary",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "no_salary",
              },
            ],
          }
          ]
        }
      }
    } 

  } else if (payload === 'living_conditions') {
    
    response = {
        "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
          {
            "title": "leave dormitory",
            "subtitle": "leave dormitory",
            "buttons": [
              {
                
                "type": "postback",
                "title": "See More",
                "payload": "leave_dormitory",
              },
            ],
          }
          
          ]
        }
      }
    } 

  } else if (payload === 'worker_rights') {

      response = {
        "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Choose a topic on worker rights",
            //"subtitle": "Tap a button to answer.",
            //"image_url": "https://sahajjo-test.herokuapp.com/images/profile_photo.jpg",
            "buttons": [
              {
                "type": "postback",
                "title": "Employment Rights",
                "payload": "employment_rights",
              },
              {
                "type": "postback",
                "title": "Passport is expiring",
                "payload": "passport_expiring",
              },
              {
                "type": "postback",
                "title": "Received a new permit",
                "payload": "new_permit",
              }
            ],
          }]
        }
      }
    }
    //If select not_received_salary button
  } else if (payload === 'employment_rights') {

      response = {

        "text": 'Learn More: https://www.shahajjo.me/post/6'

      }

  } else if (payload === 'passport_expiring') {

      response = {

        "text": 'Learn More: https://www.shahajjo.me/post/3'

      }

  } else if (payload === 'new_permit') {

      response = {

        "text": 'https://www.shahajjo.me/post/2'

      }

  } else if (payload === 'rejected_passport_transfer') {

      response = {

        "text": 'কেন রিজেক্ট আসে তা কিন্তু এমওএম সাথে ইমেইল করে রিজেক্টের কারন জানিয়ে দেয়৷ আপনার আইপি যে এপ্লাই করেছে তাকে জিজ্ঞেস করুন এমওএম কি কারন উল্লেখ করেছে। তাছাড়া আপনি নিজেও এমওএম এর সাথে যোগাযোগ করে জেনে নিতে পারেন৷'

      }
  } else if (payload === 'permit_expired') {

      response = {

        "text": 'এখন আপনার করনীয় কিছু নেই। কোম্পানি এমওএম এর কাছে এর কারন জেনে আপনাকে জানাবে। আর কোম্পানি না জানালে আপনি এমওএম এর সাথে যোগাযোগ করে জেনে নিতে পারেন।'

      }
  } else if (payload === 'travel_to_country') {

      response = {

        "text": 'এখন দেশে যেতে চাইলে কোম্পানিকে জানান৷ পারমিট ক্যানসেল বা ছুটিতে যাওয়ার ব্যাপারটি কোম্পানির উপর নির্ভর করছে। আর হ্যাঁ দেশে গেলে সবকিছু স্বাভাবিক হলে আবার আসা যাবে৷'

      }
  } else if (payload === 'holiday_to_country') {

      response = {

        "text": 'এটা নির্ভর করে কোম্পানির উপর। আপনি আপনার কোম্পানির সাথে যোগাযোগ করুন।'

      }
  } else if (payload === 'how_to_transfer') {

      response = {

        "text": 'আপনার কোম্পানি থেকে ট্রান্সফার লেটার নিয়ে ট্রান্সফার হতে পারবেন। অথবা আপনার পারমিট এর মেয়াদ যদি ৪০ দিনের কম বা ২০ দিনের বেশী থাকে তবে আপনি ট্রান্সফার লেটার ছাড়াই ট্রান্সফার হতে পারবেন৷'

      }
  } else if (payload === 'go_to_country_now') {

      response = {

        "text": ' আপনার দেশে যাওয়ার ব্যাপারটা কোম্পানির উপর নির্ভর করছে। আপনি কোম্পানিকে জানান৷ কোম্পানি এমওএম এ আপনার দেশে যাওয়ার জন্য আবেদন করবে । এমওএম সবকিছু চেক করে আপনার কোম্পানিকে প্রয়োজনীয় পদক্ষেপ গ্রহণ করার জন্য জানাবে। তবেই আপনি দেশে যেতে পারবেন। আর সবচেয়ে গুরুত্বপূর্ণ কথা হলো, এমওএন এ আবেদন করা মানেই দ্রুত দেশে যেতে পারবেন  তা নয়।এখন অনেকেই দেশে যাবার জন্য আবেদন করেছে তাই আপনাকে অপেক্ষা করতে হবে। সিরিয়াল অনুযায়ী আপনার সময় হলেই আপনি দেশে যেতে পারবেন৷'

      }
  } else if (payload === 'need_passport_back') {

      response = {

        "text": 'সিঙ্গাপুরের নিয়ম অনুসারে আপনার বস আপনার পাসপোর্ট হোল্ড করতে পারেন না৷ তাই এই ব্যাপারে আপনার ডরমিটরিতে যে ফাস্ট টীমের সদস্যরা আছে তাদের কাছে হেল্প চান তারা সহায়তা করবে। এমনকি আপনি এমওএম ও সিঙ্গাপুর পুলিশের সহায়তা চাইতে পারেন তারাও হেল্প করবে।'

      }
  } else if (payload === 'passport_coming') {

      response = {

        "text": 'আপনি হাইকমিশনের সাথে যোগাযোগ করুন৷ যদি ডরমিটরি থেকে বের হতে না পারেন তবে এই নাম্বারে কল দিয়ে জেনে নিতে পারেন৷ হাইকমিশনের নাম্বার : +6566610280'

      }
  } else if (payload === 'quarantine_pay') {

      response = {

        "text": 'ভাই আপনি কোয়ারেন্টাইন অর্ডার এর কোন টাকা পাবেন না।তবে আপনার কোম্পানি আপনাকে বেসিক বেতন দিবে।'

      }
  } else if (payload === 'ip_refund') {

      response = {

        "text": 'সিঙ্গাপুরে লেনদেন করতে হলে অবশ্যই টাকা দেওয়ার রসিদ বুঝে নিবেন। আপনার যদি টাকা প্রদান করার রসিদ থাকে তাহলে এমওএম বা পুলিশের সাথে যোগাযোগ করুন তারা আপনাকে হেল্প করবে। আর ট্রান্সফারের ব্যাপারে অবশ্যই সিঙ্গাপুর সরকার কর্তৃক অনুমতিপ্রাপ্ত এজেন্সিগুলো বাছাই করে নিবেন। সরকার কর্তৃক অনুমতিপ্রাপ্ত নয় এমন এজেন্সি বা ব্যক্তির সাথে লেনদেন করা আইনত দণ্ডনীয় অপরাধ।'

      }
  } else if (payload === 'no_salary') {

      response = {

        "text": 'আপনি নিচের হেল্ললাইনে যোগাযোগ করুন তারা আপনাকে হেল্প করবে। Call: 88312560 WhatsApp: https://wa.me/6588312560 Call: 90895538 WhatsApp: https://wa.me/6590895538 Call: 86477244 WhatsApp: https://wa.me/6586477244 Call: 98830947 WhatsApp: https://wa.me/6598830947'

      }
  } else if (payload === 'leave_dormitory') {

      response = {

        "text": 'হ্যাঁ জরুরি কাজে যেতে পারবেন৷ তবে এক্ষেত্রে আপনার কোম্পানি বা ডরমিটরির অপারেটরকে জানান৷ তারা এমওএম এ আবেদন করে আপনার বাহিরে যাবার ব্যাপারে প্রয়োজনীয় সহায়তা করবে।'

      }
  }

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v8.0/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}

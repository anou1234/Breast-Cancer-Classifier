# Breast-Cancer-Classifier
An AI-powered Web app to detect the presence of Invasive Ductal Carcinoma (IDC) in histopathology breast-tissue images


![screencapture-127-0-0-1-5500-Breast-Cancer-Analyzer-master-index-html-2022-12-23-23_30_52](https://user-images.githubusercontent.com/92670920/209392243-f041dbda-c429-48fe-b926-69bab71c061a.png)

This is a web app that can detect the presence of Invasive Ductal Carcinoma (IDC),the most common subtype of breast cancer in histopathology image patches. 

Can also take images as an input to detect the presence of cancer.

The current histopathology process is time consuming and small malignant areas can be missed. 

This app can help speed up a pathologist's workflow and provide diagnosis support.

<b> [ LINK TO THE DATASET ](http://www.andrewjanowczyk.com/deep-learning/)</b> 
(.png image format)

## File Structure

1. index.html : home page of website (open this page with live server on your web browser)

2. IDC_classifier.ipynb : Jupyter NB file containing the code to create , train and test  the IDC model; model F-score = 0.88

3. jscript,css,assets: js,css and image folders

4. idc_model_v1 : contains model.json file


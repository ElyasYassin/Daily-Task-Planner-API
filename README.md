# Daily-Task-Planner


Final Project Web API: Daily Task Planner

1. Overview

A daily task planner web application leveraging machine learning to personalize task recommendations for users.
2. Novelty

Utilizes machine learning to analyze past user task patterns and generate personalized daily plans.
3. Machine Learning Utilization

Analyzes past user task patterns to propose predefined daily plans (e.g., waking time, gym time).
Recommends adjustments based on observed deviations in task completion patterns.
4. Features Implemented with Difficulty

User Authentication (Easy):
Store user information securely in MongoDB.
Implement robust authentication methods (e.g., JWT).
Frontend:
Create login/signup pages (Easy).
Develop daily tasks page (Medium complexity).
Enable access to past to-do lists.
Database:
Securely store user information and tasks per day.
Ensure stringent security measures due to sensitive user data.
5. Machine Learning Model Training

Approach: Reinforcement Learning or Heuristics-based algorithms.
Training Data: Access past to-do lists and task completion information.
Challenges and Solutions:
Limited data initially:
Implement semi-supervised learning.
Design algorithms based on task management principles.
User Feedback:
Collect feedback on suggested tasks' relevance.
Initial user questionnaire to gather scheduling preferences.
6. Integrating Machine Learning to MERN

Develop a Python API to link with the MERN stack.
API Functionality:
Connect to MongoDB to access user data.
Implement trained predictive model for task recommendations.
Challenges:
Ensuring compatibility between Python API and MERN frontend.
Designing efficient data exchange between frontend, backend, and ML model.
Project Outline/Steps:

Backend Setup:
Create MongoDB databases and APIs for user authentication and task management.
Utilize JWT authentication for security.
Test and deploy APIs using tools like Postman and Render.
Frontend Setup:
Design UI mockup inspired by a weekly to-do list.
Develop React components for interactive UI.
Machine Learning API:
Decide on the ML model/algorithm.
Prototype ML pipeline for data preprocessing, training, and inference.
Build Python API using frameworks like Flask or FastAPI.
Define API endpoints for interacting with the ML model.
Additional Considerations:

Data Collection and Preprocessing: Plan for collecting and preprocessing user task data.
Model Evaluation and Iteration: Implement mechanisms for evaluating and improving model performance.
User Feedback and Engagement: Incorporate features for user feedback to enhance system effectiveness over time.
By following these steps and considering additional aspects, the project can deliver a personalized task management application that effectively utilizes machine learning for task recommendations.

import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config()
require('dotenv').config()
export const api = axios.create({
    baseURL: process.env.IP,
})
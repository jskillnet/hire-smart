// Imports
import mongoose from 'mongoose'

// App Imports
import { collection as Organization } from '../organization/model'
import { collection as Client } from '../client/model'
import { collection as Candidate } from '../candidate/model'
import { collection as Interviewer } from '../interviewer/model'
import { collection as Interview } from '../interview/model'
import { collection as User } from '../user/model'
import { collection as Invite } from '../invite/model'
import { collection as Job } from '../job/model'

// Collection name
export const collection = 'Kanban'

// Schema
const Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
    index: true
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Organization,
    index: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Client
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Candidate
  },
  interviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Interviewer
  },
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Interview
  },
  inviteId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Invite
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Job
  },
  type: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, Schema, collection)

export interface CreatePresignedUrlResponse {
  url: string
  fields: CreatePresignedUrlFieldsResponse
}

export interface CreatePresignedUrlFieldsResponse {
  key: string
  AWSAccessKeyId: string
  "x-amz-security-token": string
  policy: string
  signature: string
}

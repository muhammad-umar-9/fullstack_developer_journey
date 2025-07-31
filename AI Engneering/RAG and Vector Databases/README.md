
# RAG and Vector Databases

## 1. Embeddings

### What are Embeddings?
- **Definition**: Numerical representations of text, images, or other data that AI models can understand
- **Purpose**: Convert human-readable content (alphabets, words, sentences) into numerical vectors
- **Key Concept**: They create a "numerical snapshot" of data that captures semantic meaning

### How Embeddings Work:
- Transform text into high-dimensional vectors (arrays of numbers)
- Similar concepts have similar vector representations
- Enable mathematical operations on text data
- Preserve semantic relationships between words/concepts

### Example:
```
"cat" → [0.2, -0.1, 0.8, 0.3, ...]
"dog" → [0.3, -0.2, 0.7, 0.4, ...]
"car" → [-0.5, 0.9, -0.3, 0.1, ...]
```

**Resource**: [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings/what-are-embeddings?lang=javascript)

## 2. Vector Databases

### What are Vector Databases?
- **Different from traditional databases**: Don't look for exact value matches
- **Core functionality**: Store and search using similarity metrics
- **Purpose**: Enable semantic search and similarity-based retrieval

### Popular Vector Databases:
1. **Chroma** - Open-source, Python-focused
2. **Pinecone** - Cloud-native, scalable
3. **Supabase** - PostgreSQL-based with vector extensions

### Key Features:
- Store high-dimensional vectors efficiently
- Fast similarity search algorithms
- Scalable for large datasets
- Integration with AI/ML workflows

## 3. Setting up Supabase for Vector Storage

### Step-by-Step Setup:

#### Step 1: Create Supabase Project
1. Go to [supabase.io](https://supabase.io)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose organization and project name
5. Set database password
6. Select region closest to you
7. Click "Create new project"

#### Step 2: Enable Vector Extension
```sql
-- Enable the vector extension
CREATE EXTENSION IF NOT EXISTS vector;
```

#### Step 3: Create Vector Table
```sql
-- Create table for storing embeddings
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  metadata JSONB,
  embedding vector(1536)  -- Adjust dimension based on your model
);

-- Create index for faster similarity search
CREATE INDEX ON documents 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

#### Step 4: Environment Variables
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
```

#### Step 5: Install Required Packages
```bash
npm install @supabase/supabase-js
# or
pip install supabase
```

## 4. Storing Vector Embeddings

### Process Flow:
1. **Generate Embeddings**: Use OpenAI or other embedding models
2. **Store in Database**: Insert vectors with metadata
3. **Index Creation**: Enable fast similarity search

### Example Code (JavaScript):
```javascript
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const supabase = createClient(url, key)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Generate embedding
const response = await openai.embeddings.create({
  model: "text-embedding-ada-002",
  input: "Your text to embed"
})

const embedding = response.data[0].embedding

// Store in Supabase
await supabase
  .from('documents')
  .insert({
    content: "Your text",
    embedding: embedding,
    metadata: { source: "document.pdf" }
  })
```

## 5. Semantic Search

### What is Semantic Search?
- **Beyond keyword matching**: Understands meaning and context
- **Example**: Searching "canine" returns results about "dogs"
- **Real-world usage**: Spotify uses this for music recommendations

### How it Works:
1. Convert search query to embedding
2. Find similar vectors in database
3. Return most relevant results
4. Rank by similarity score

### Benefits:
- Natural language queries
- Context-aware results
- Handles synonyms and related concepts
- Better user experience

## 6. Cosine Similarity Algorithm

### Mathematical Foundation:
$$\text{Cosine Similarity} = \frac{A \cdot B}{||A|| \times ||B||}$$

Where:
- $$A$$ and $$B$$ are vector embeddings
- $$A \cdot B$$ is the dot product
- $$||A||$$ and $$||B||$$ are vector magnitudes

### Similarity Range:
- **1.0**: Identical vectors
- **0.0**: Orthogonal (no similarity)
- **-1.0**: Opposite vectors

### Implementation Example:
```javascript
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}
```

## 7. Query Embeddings and Similarity Search

### Search Process:
```javascript
// 1. Generate query embedding
const queryEmbedding = await generateEmbedding(userQuery)

// 2. Search similar vectors
const { data } = await supabase.rpc('similarity_search', {
  query_embedding: queryEmbedding,
  similarity_threshold: 0.7,
  match_count: 5
})
```

### SQL Function for Similarity Search:
```sql
CREATE OR REPLACE FUNCTION similarity_search(
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
RETURNS TABLE (
  id bigint,
  content text,
  similarity float
)
LANGUAGE sql
AS $$
  SELECT 
    documents.id,
    documents.content,
    (documents.embedding <=> query_embedding) * -1 + 1 AS similarity
  FROM documents
  WHERE (documents.embedding <=> query_embedding) * -1 + 1 > similarity_threshold
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
$$;
```

## 8. RAG (Retrieval-Augmented Generation)

### Complete RAG Pipeline:

#### Components:
1. **Document Processing**: Chunk and embed documents
2. **Vector Storage**: Store embeddings in database
3. **Retrieval**: Find relevant context using similarity search
4. **Generation**: Use retrieved context with LLM

#### Implementation Flow:
```javascript
async function ragPipeline(userQuery) {
  // 1. Retrieve relevant documents
  const context = await semanticSearch(userQuery)
  
  // 2. Generate response with context
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Use this context to answer: ${context.join('\n')}`
      },
      {
        role: "user", 
        content: userQuery
      }
    ]
  })
  
  return response.choices[0].message.content
}
```

## 9. Document Chunking Strategies

### Why Chunking?
- **Token limits**: LLMs have context windows
- **Relevance**: Smaller chunks = more precise retrieval
- **Performance**: Faster search and processing

### Chunking Methods:
1. **Fixed-size**: Split by character/token count
2. **Sentence-based**: Split at sentence boundaries  
3. **Paragraph-based**: Preserve semantic units
4. **Semantic**: Split by topic/meaning

### Example Implementation:
```javascript
function chunkText(text, chunkSize = 1000, overlap = 200) {
  const chunks = []
  let start = 0
  
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    chunks.push(text.slice(start, end))
    start = end - overlap
  }
  
  return chunks
}
```


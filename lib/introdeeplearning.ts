export const initailMessage = {
    role: 'system',
    contents: [
        {
        text: 
            `
            You are a Student assistant. Only answer questions based on the topics in the content provided below.
            Do not use your own knowledge or external information.
            If the answer is not in the content, respond with "I don't have that information.".

                COLLEGE OF TECHNOLOGY-UNIVERSITY OF BUEA 
Course: Introduction to Deep Learning 
Course code:CEC424 
Dr-Eng. Aurelle TCHAGNA 
Big Data/ Data Analytics, IoT & AI 
+237 696263641
Objective
 • The course will be designed to enable the student to know the applications
 and concepts of Deep Learning
 Course Description
 • Deep learning is an artificial intelligence (AI) function that imitates the
 workings of the human brain in processing data and creating patterns for
 use in decision making. Deep learning is a subset of machine learning in
 artificial intelligence that has networks capable of learning unsupervised
 from data that is unstructured or unlabeled. Also known as deep neural
 learning or deep neural network. In this course, we are learnt definition of
 Deep Learning, different platform and libraries use for Deep Learning
 problems.
OUTLINE
 • Chapter 1–FundamentalofDeepLearning
 • Chapter 2–DeepLearningModels
 • Chapter 3–Additional DeepLearning Models
 • Chapter 4–MathematicalConceptofConvolutionalNeural Network
 • Chapter 5-DeepLearningPlatforms&Libraries
 • Chapter 6- Practical Examples and Project
Chapter 1 – Fundamental of Deep Learning
 So, 1. what exactly is deep learning ? 
And, 2. why is it generally better than other methods on image, speech and 
certain other types of data? 
So, 1. what exactly is deep learning? 
And, 2. why is it generally better than other methods 
on image, speech and certain other types of data? 
The short answers
 1.   ‘Deep Learning’ means using a neural network
 with several layers of nodesbetween input and output
 2.   the series of layers between input & output do
 feature identification and processing in a series of stages, 
just as our brains seem to.
hmmm… OK, but: 
3. multilayer neural networks have been around 
for
 25 years.  What’s actually new?
hmmm… OK, but: 
3. multilayerneural networks have been around for
 25 years.  What’s actually new?
 we have always had good algorithms for learning the
 weights in networks with 1 hidden layer
 but these algorithms are not good at learning the weights for
 networks with more hidden layers 
what’s new is:   algorithms for training many-later networks
longer answers
 1. reminder/quick-explanation of how neural network weights are 
learned;
 2. the idea of unsupervised feature learning (why ‘intermediate 
features’ are important for difficult classification tasks, and how 
NNs seem to naturally learn them)
 3. The ‘breakthrough’ – the simple trick for training Deep neural 
networks
-0.06-2.5
 1.4
 W1 
W2 
W3 
f(x)
-0.06-2.5
 1.4
 2.7-8.6
 0.002
 f(x)
 x =  -0.06×2.7 + 2.5×8.6 + 1.4×0.002  = 21.34 
A  dataset
 Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc…
Training the neural network 
Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc …
Training data
 Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc …
 Initialise with random weights
Training data
 Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc …
 Present a training pattern
 1.4 
2.7                                                    
1.9        
Training data
 Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc …
 Feed it through to get output
 1.4 
2.7                                                    0.8
 1.9        
Training data
 Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc …
 Compare with target output
 1.4 
2.7                                                    0.8 
0
 1.9                                           error 0.8
Training data
 Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc …
 Adjust weights based on error
 1.4 
2.7                                                    0.8 
0                                        
1.9                                           error 0.8
Training data
 Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc …
 Present a training pattern
 6.4 
2.8                                                    
1.7        
Training data
 Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc …
 Feed it through to get output
 6.4 
2.8                                                     0.9                                                   
1.7        
Training data
 Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc …
 Compare with target output
 6.4 
2.8                                                     0.9                                                   
1
 1.7                                          error-0.1
Training data
 Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc …
 Adjust weights based on error
 6.4 
2.8                                                     0.9                                                   
1
 1.7                                          error-0.1
Training data
 Fields               class
 1.4  2.7   1.9         0
 3.8  3.4   3.2         0
 6.4  2.8   1.7         1
 4.1  0.1   0.2         0
 etc …
 And so on ….
 6.4 
2.8                                                     0.9                                                   
1
 1.7                                          error-0.1
 Repeat this thousands, maybe millions of times –each time
 taking a random training instance, and making slight 
weight adjustments
 Algorithms for weight adjustment are designed to make
 changes that will reduce the error
The decision boundary 
perspective…
 Initial random weights
The decision boundary 
perspective…
 Present a training instance / adjust the weights
The decision boundary 
perspective…
 Present a training instance / adjust the weights
The decision boundary 
perspective…
 Present a training instance / adjust the weights
The decision boundary 
perspective…
 Present a training instance / adjust the weights
The decision boundary 
perspective…
 Eventually ….
The point I am trying to make
 • weight-learning algorithms for NNs are dumb
 • they work by making thousands and thousands of tiny 
adjustments, each making the network do better at the 
most recent pattern, but perhaps a little worse on many 
others
 • but, by dumb luck, eventually this tends to be good enough 
to
 learn effective classifiers for many real applications
Some other points
 Detail of a standard NN weight learning algorithm – later 
If f(x) is non-linear, a network with 1 hidden layer can, in theory, learn 
perfectly any classification problem. A set of weights exists that can 
produce the targets from the inputs. The problem is finding them. 
Some other ‘by the way’ points
 If f(x) is linear, the NN can only draw straight  decision 
boundaries (even if there are many layers of units)
Some other ‘by the way’ points
 NNs use nonlinear f(x) so they
 can draw complex boundaries,
 but keep the data unchanged
Some other ‘by the way’ points
 NNs use nonlinear f(x) so they       
can draw complex boundaries,        
 SVMs only draw straight lines,     
but they transform the data first
 but keep the data unchanged           in a way that makes that OK
Feature 
detectors
what is this 
unit doing?
Hidden layer units become 
self-organised feature 
detectors
 …
 1
 63
 1                5                10                 15                20                25 …
 strong +ve weight
 low/zero weight
What does this unit detect? 
1                5                10                 15                20                25 …
 1
 …
 strong +ve weight
 low/zero weight
 63
What does this unit detect? 
…
 1
 63
 1                5                10                 15                20                25 …
 strong +ve weight
 low/zero weight
 it will send strong signal for a horizontal
 line in the top row, ignoring everywhere else 
What does this unit detect? 
1                5                10                 15                20                25 …
 1
 …
 strong +ve weight
 low/zero weight
 63
What does this unit detect? 
1                5                10                 15                20                25 …
 1
 …
 strong +ve weight
 low/zero weight
 Strong signal for a dark area in the top left
 corner 
63
What features might you expect a good NN
 to learn, when trained with data like this?
vertical lines
 1
 63
Horizontal lines
 1
 63
Small circles
 1
 63
63
 1
 Small circles
 But what about position invariance  ???
 our example unit detectors were tied to 
specific parts of the image  
successive layers can learn higher-level features 
…
 detect lines in
 Specific positions
 Higher level detetors
 ( horizontal line, 
“RHS vertical lune”
 “upper loop”, etc…
 v
 etc …
 etc …
successive layers can learn higher-level features 
…
 detect lines in
 Specific positions
 Higher level detetors
 ( horizontal line, 
“RHS vertical lune”
 “upper loop”, etc…
 v
 etc …
 etc …
 What does this unit detect?
So: multiple layers make sense
So: multiple layers make sense
 Your brain works that way
So: multiple layers make sense
 Many-layer neural network architectures should be capable of 
learning the true underlying features and ‘feature logic’, and  therefore 
generalise very well …
But, until very recently, our  weight-learning 
algorithms simply did not work on multi-layer 
architectures
Along came deep learning …
The new way to train multi-layer NNs…
The new way to train multi-layer NNs…
 Train this layer first
The new way to train multi-layer NNs…
 Train this layer first
 then this layer
The new way to train multi-layer NNs…
 Train this layer first
 then this layer
 then this layer
The new way to train multi-layer NNs…
 Train thislayer first
 then thislayer
 then thislayer
 then thislayer
The new way to train multi-layer NNs…
 Train thislayer first
 then thislayer
 then thislayer
 then thislayer
 finally thislayer
The new way to train multi-layer NNs…
 EACH of the (non-output) layers is 
trained to be an auto
encoder Basically, it is forced to learn good 
features that describe what comes 
from the previous layer
an auto-encoder is trained, with an absolutely 
standard weight-adjustment algorithm  to 
reproduce 
the input
an auto-encoder is trained, with an absolutely 
standard weight-adjustment algorithm  to 
reproduce 
the input
 By making this happen with (many) fewer units than 
the inputs, this forces the ‘hidden layer’ units to 
become good feature detectors
intermediate layers are each trained to 
be auto encoders (or similar) 
Final layer trained to predict class 
based on outputs from previous layers
And that’s that
 • That’s the basic idea
 • There are many many types of deep learning,
 • different kinds of autoencoder, variations on 
architectures and training algorithms, etc…
 • Very fast growing area …
•Chapter 2– Deep Learning Models
Outline
 •Self-taught learning
 •Learning feature hierarchies (Deep learning)
 •Scaling up
Self-taught learning
Supervised learning
 Cars
 Testing:
 Motorcycles
 What is this?  
Semi-supervised learning
 Unlabeled images (all cars/motorcycles)
 Car
 Motorcycle
 Testing:
 What is this?  
Self-taught learning
 Unlabeled images (random internet images)
 Motorcycle
 Testing:
 What is this?  
Car
Self-taught learning
 Sparse 
coding,  
LCC, etc. 
f1, f2, …, fk
 Car Motorcycle
 Use learned f1, f2, …, fkto represent training/test sets. 
Using f1, f2, …, fk a1, a2, …, ak
 If have labeled 
training set is small, 
can give huge 
performance boost.
Learning feature 
hierarchies/Deep learning
Why feature hierarchies
 object models
 object parts
 (combination 
of edges)
 edges
 pixels
Deep learning algorithms
 • Stack sparse coding algorithm
 • Deep Belief Network (DBN) (Hinton)
 • Deep sparse autoencoders (Bengio) 
[Other related work: LeCun, Lee, Yuille, Ng …] 
Deep learning with autoencoders
 • Logistic regression
 • Neural network
 • Sparse autoencoder 
• Deep autoencoder
Deep learning with autoencoders
 • Logistic regression
 • Neural network
 • Sparse autoencoder 
• Deep autoencoder
 Andrew Ng
Logistic regression
 Logistic regression has a learned parameter vector q.  
On input x, it outputs:
 where  
x1
 Draw a logistic
 regression unit 
as: 
x2
 x3
 Andrew Ng
 +1
Neural Network
 String a lot of logistic units together.  Example 3 layer 
network:  
x1
 x2
 x3
 +1
 Layer 1
 +1
 Layer 3
 a1
 a2
 a3
 Layer 3
 Andrew Ng
Neural Network
 Example 4 layer network with 2 output units: 
x1
 x2
 x3
 +1
 Layer 1
 +1
 Layer 2
 +1
 Layer 3
 Layer 4
 Andrew Ng
Training a neural network
 Given training set (x1, y1), (x2, y2), (x3, y3 ), …. 
Adjust parameters q (for every node) to make: 
(Use gradient descent. “Backpropagation” algorithm. 
Andrew Ng
 Susceptible to local optima.)  
Unsupervised feature learning with a neural network
 x1
 x2
 x3
 x4
 x5
 x6
 +1
 Layer 1
 x1
 x2
 a1
 a2
 a3
 +1
 Layer 2
 x3
 x4
 x5
 x6
 Layer 3
 Autoencoder.
 Network is trained to 
output the input (learn 
identify function). 
Trivial solution unless:- Constrain number of 
units in Layer 2 (learn 
compressed 
representation), or- Constrain Layer 2 to 
be sparse. 
Andrew Ng
Unsupervised feature learning with a neural network
 Training a sparse autoencoder.
 Given unlabeled training set x1, x2, …
 Reconstruction 
error term
 L1 sparsity term
 a1
 a2
 a3
 Andrew Ng
Unsupervised feature learning with a neural network
 x1
 x2
 x3
 x4
 x5
 x6
 +1
 x1
 x2
 a1
 a2
 a3
 +1
 Layer 2
 x3
 x4
 x5
 x6
 Layer 3
 Andrew Ng
 Layer 1
Unsupervised feature learning with a neural network
 x1
 x2
 x3
 x4
 x5
 x6
 +1
 a1
 a2
 a3
 +1
 Layer 2
 New representation for input. 
Andrew Ng
 Layer 1
Unsupervised feature learning with a neural network
 x1
 x2
 x3
 x4
 x5
 x6
 +1
 a1
 a2
 a3
 +1
 Layer 2
 Andrew Ng
 Layer 1
Unsupervised feature learning with a neural network
 x1
 x2
 x3
 x4
 x5
 x6
 +1
 a1
 a2
 a3
 +1
 b1
 b2
 b3
 +1
 Train parameters so that              
subject to bi’s being sparse. 
    ,
 Andrew Ng
Unsupervised feature learning with a neural network
 x1
 x2
 x3
 x4
 x5
 x6
 +1
 a1
 a2
 a3
 +1
 b1
 b2
 b3
 +1
 Train parameters so that              
subject to bi’s being sparse. 
    ,
 Andrew Ng
Unsupervised feature learning with a neural network
 x1
 x2
 x3
 x4
 x5
 x6
 +1
 a1
 a2
 a3
 +1
 b1
 b2
 b3
 +1
 Train parameters so that              
    ,
 Andrew Ng
 subject to bi’s being sparse. 
Unsupervised feature learning with a neural network
 x1
 x2
 x3
 x4
 x5
 x6
 +1
 a1
 a2
 a3
 +1
 b1
 b2
 b3
 +1
 New representation for input. 
Andrew Ng
Unsupervised feature learning with a neural network
 x1
 x2
 x3
 x4
 x5
 x6
 +1
 a1
 a2
 a3
 +1
 b1
 b2
 b3
 +1
 Andrew Ng
Unsupervised feature learning with a neural network
 x1
 x2
 x3
 x4
 x5
 x6
 a1
 a2
 a3
 +1
 +1
 b1
 b2
 b3
 +1
 c1
 c2
 c3
 +1
 Andrew Ng
Unsupervised feature learning with a neural network
 x1
 x2
 x3
 x4
 x5
 x6
 +1
 a1
 a2
 a3
 +1
 b1
 b2
 b3
 +1
 c1
 c2
 c3
 +1
 New representation 
for input. 
Andrew Ng
 Use [c1, c3, c3] as representation to feed to learning algorithm.
Deep Belief Net
 Deep Belief Net (DBN) is another algorithm 
for learning a feature hierarchy. 
Building block: 2-layer graphical model 
(Restricted Boltzmann Machine).
 Can then learn additional layers one at a 
time. 
Andrew Ng
Restricted Boltzmann machine (RBM) 
a1
 a2 a3
 x1 x2 x3
 MRF with joint distribution: 
Layer 2. [a1, a2, a3]
 (binary-valued) 
x4
 Input [x1, x2, x3, x4]
 Use Gibbs sampling for inference.
 Given observed inputs x, want maximum likelihood estimation: 
Andrew Ng
Restricted Boltzmann machine (RBM) 
a1
 a2 a3
 x1 x2 x3
 Gradient ascent on log P(x) :
 Layer 2. [a1, a2, a3]
 (binary-valued) 
x4
 Input [x1, x2, x3, x4]
 [xiaj]obs  from fixing x to observed value, and sampling a from P(a|x).
 [xiaj]prior from running Gibbs sampling to convergence. 
Adding sparsity constraint on ai’s usually improves results. 
Andrew Ng
Deep Belief Network
 Similar to a sparse autoencoder in many ways. 
Stack RBMs on top of each other to get DBN. 
Layer 3. [b1, b2, b3]
 Layer 2. [a1, a2, a3]
 Input [x1, x2, x3, x4]
 Andrew Ng
Deep Belief Network
 Layer 4. [c1, c2, c3]
 Layer 3. [b1, b2, b3]
 Layer 2. [a1, a2, a3]
 Input [x1, x2, x3, x4]
 Andrew Ng
Deep learning examples
 Andrew Ng
Convolutional DBN for audio
 Max pooling unit
 Detection units
 Spectrogram
 Andrew Ng
Convolutional DBN for audio
 Spectrogram
 Andrew Ng
Probabilistic max pooling
 Convolutional DBN:
 Convolutional Neural net:
 max {x1, x2, x3, x4}
 0
 max {x1, x2, x3, x4}
 0 0 0 0
 X3
 X1 X2 X4
 Where xi are {0,1}, and mutually 
exclusive.  Thus, 5 possible cases:
 0
 1 1
 0 0 0 0 0 0 0 0 0 0
 X1
 X2
 X3
 X4
 Where xi are real numbers.
 1
 1
 0 0
 1
 0
 0
 1
 1
 0
 0
 1
 Collapse 2n configurations into n+1 
configurations. Permits bottom up and 
top down inference.  
Andrew Ng
Convolutional DBN for audio
 Spectrogram
 Andrew Ng
Convolutional DBN for audio
 Max pooling
 Detection units
 Max pooling
 Detection units
 Second CDBN 
layer
 One CDBN 
layer
 Andrew Ng
CDBNs for speech
 Learned first-layer bases
 Andrew Ng
Convolutional DBN for Images
 At most one hidden 
nodes are active.
 ‘’max-pooling’’ node (binary)
 Wk
 Max-pooling layer P
 Detection layer H
 Hidden nodes (binary)
 “Filter” weights (shared)
 Input data V
 Andrew Ng
Convolutional DBN on face images
 object models
 object parts
 (combination 
of edges)
 edges
 Andrew Ng
 pixels
Learning of object parts
 Examples of learned object parts from object categories
 Faces
 Cars
 Elephants
 Chairs
 Andrew Ng
Training on multiple objects
 Trained on 4 classes (cars, faces, motorbikes, airplanes). 
Second layer: Shared-features and object-specific features.
 Third layer: More specific features. 
Plot of H(class|neuron active)
 Third layer bases learned 
from 4 object categories.
 Second layer bases learned 
from 4 object categories.
 Andrew Ng
Hierarchical probabilistic inference
 Generating posterior samples from faces by “filling in” experiments
 (cf. Lee and Mumford, 2003).  Combine bottom-up and top-down inference. 
Input images
 Samples from 
feedforward 
Inference 
(control)
 Samples from 
Full posterior
 inference 
Andrew Ng
Key issue in feature 
learning: Scaling up
 Andrew Ng
Scaling up with graphics processors
 US$ 250
 NVIDIA GPU
 Peak 
GFlops
 Intel CPU
 2003           
2004          
(Source: NVIDIA CUDA Programming Guide)
 2005         
2006            
2007                 
2008
 Andrew Ng
Scaling up with GPUs
 Approx. number of parameters (millions): 
Using GPU (Raina et al., 2009)
 Andrew Ng
Unsupervised feature 
learning: Does it work?
 Andrew Ng
Audio
 State-of-the-art task performance
 TIMIT Phone classification Accuracy
 Prior art (Clarkson et al.,1999) 79.6%
 Stanford Feature learning
 TIMIT Speaker identification Accuracy
 Prior art (Reynolds, 1995)
 80.3%
 99.7%
 Stanford Feature learning
 Images
 CIFAR Object classification Accuracy
 Prior art (Yu and Zhang, 2010) 
74.5%
 Stanford Feature learning
 100.0%
 NORBObject classification Accuracy
 75.5%
 Video
 UCF activity classification
 Prior art (Kalser et al., 2008) 
Stanford Feature learning
 Accuracy
 86%
 Prior art (Ranzato et al., 2009) 94.4%
 Stanford Feature learning
 96.2%
 Hollywood2 classification
 Prior art (Laptev, 2004)
 87%
 Accuracy
 47%
 Stanford Feature learning
 Multimodal (audio/video)
 AVLetters Lip reading
 Prior art (Zhao et al., 2009)
 Accuracy
 58.9%
 Stanford Feature learning
 50%
 Andrew Ng
 63.1%
Summary
 • Instead of hand-tuning features, use unsupervised feature 
learning! 
• Sparse coding, LCC. 
• Advanced topics:–Self-taught learning –Deep learning–Scaling up
 Andrew Ng
Mathematical
 Concept
 Convolutional Neural Network
 of
Basic concepts revolving around CNNs
 1. Convolution Layer
 Before the concept of convolution was presented by Yann LeCun in 1998 for digit classification, people
 used other methods like support vector machine, knn, logistic regression, etc to classify images. In those
 algorithms, pixel values were considered as features i.e. for a 28x28 image there would be 784 features.
 There are a lot of algorithms that people used for image classification before convolution became popular.
 People used to create features from images and then feed those features into some classification algorithm like
 SVM. Some algorithms also used the pixel level values of images as a feature vector. To give an example, you
 could train a SVM with 784 features where each feature is the pixel value for a 28x28 image. This way we lose a
 lot of spatial interaction between pixels. We could still handpick features out of the image similar to what a
 convolution layer automatically does, but it would be much time intensive. Convolution layer uses information
 from adjacent pixels to down-sample the image into features by convolution and then use prediction layers to
 predict the target values.
Basic concepts revolving around CNNs
 1. Convolution Layer
 • We use multiple convolution filters or kernels that run over the image and compute a dot product. Each
 filter extracts different features from the image.
 • Lets consider a filter of size 3x3 and an image of size 5x5. We perform an element wise multiplication
 between the image pixel values that match the size of the kernel and the the kernel itself and sum them up.
 This provides us a single value for the feature cell.
Basic concepts revolving around CNNs
 1. Convolution Layer
 In the this example we are sliding the kernel by 
1 pixel. This is called stride. We can have the 
kernel move by different stride values to extract 
different kinds of features.
 Also the amount of stride we choose affects the 
size of the feature extracted. The equation to 
calculate the size of feature for a particular 
kernel size is as follows:
 Feature size = ((Image size − Kernel 
size) / Stride) + 1
 We can put the values for the above example and verify it.
 Feature size = ((5 − 3) / 1) + 1 = 3
Basic concepts revolving around CNNs
 1. Convolution Layer
 So with a stride of 2 the kernel of size 3x3 on a image of size 5x5 would only be able to extract a feature of size 2.
 What if you want the feature to be of the same size as the input image?
Basic concepts revolving around CNNs
 1. Convolution Layer
 • Padding is a technique to simply add zeros around the margin of the image to increase it’s dimension.
 Padding allows us to emphasizetheborder pixels and in order lose less information.
 • Here is an example with an input image of size 5x5 which is padded to 7x7 i.e. padding size of 1 and
 convoluted by a kernel of size 3x3 with stride of 1 resulting in a feature of size 5x5.
Basic concepts revolving around CNNs
 1. Convolution Layer
 ➢ The equation to calculate the size of feature for a particular kernel size when
 considering a padded image is as follows:
 ➢ Feature size=((Imagesize+2*Padding size−Kernelsize)/Stride)+1
 ➢ Wecanputinthevaluesfortheaboveexample andverifyit.
 ➢ Feature size=((5+2*1−3)/1)+1=5
 • Foranimagewith3channelsi.e.rgbwe performthesameoperationonallthe3channels.
 • Aneural network learns those kernel values through back propogation to extract different
 features of the image. Typically in a convolutional neural network we would have more than
 1 kernel at each layer. We can further use those feature maps to perform different tasks like
 classification, segmentation, object detection etc.
Basic concepts revolving around CNNs
 1. Convolution Layer
Basic concepts revolving around CNNs
 1. Convolution Layer
Basic concepts revolving around CNNs
 2. Max Pooling Layer
 • Max pooling layer helps reduce the spatial size of the convolved features and also helps reduce over-fitting 
by providing an abstracted representation of them. It is a sample-based discretization process.
 • It is similar to the convolution layer but instead of taking a dot product between the input and the kernel we 
take the max of the region from the input overlapped by the kernel.
 • Below is an example which shows a maxpool layer’s operation with a kernel having size of 2 and stride of 1.
Basic concepts revolving around CNNs
 3. RelU (Rectified Linear Unit) Activation Function
 Activation functions introduce non-linearity to the model which allows it to learn complex functional mappings between the inputs and 
response variables. There are quite a few different activation functions like sigmoid, tanh, RelU, Leaky RelU, etc.
 RelU function is a piecewise linear function that outputs the input directly if is positive i.e. > 0, otherwise, it will output zero.
 ReLU(x)=max(0,x)
 There are many other activation functions but RelU is the most used activation function 
for many kinds of neural networks as because of it’s linear behavior it is easier to train 
and it often achieves better performance.
 RelU activation after or before max pooling layer
 Well, MaxPool(Relu(x)) = Relu(MaxPool(x))
 So they satisfy the communicative property and can be used either way. In practice RelU 
activation function is applied right after a convolution layer and then that output is max 
pooled.
Basic concepts revolving around CNNs
 4. Fully Connected layers
 In a fully connected layer the input layer nodes are connected to every node in the second layer. We 
use one or more fully connected layers at the end of a CNN. Adding a fully-connected layer helps learn 
non-linear combinations of the high-level features outputted by the convolutional layers.
 Usually, activation function and dropout layer are used between two 
consecutive fully connected layers to introduce non-linearity and reduce 
over-fitting respectively.
 At the last fully connected layer we choose the output size based on our 
application. For classifying the MNIST handwritten digits the last layer 
will be of size 10 i.e. one node for each digit and we will take a softmax 
of the output which gives us a 10 dimensional vector containing 
probabilities (a number ranging from 0–1) for each of the digits.
Basic concepts revolving around CNNs
 5. Dropout layer
 Dropout is a regularization technique used to reduce over-fitting on neural networks. Usually, deep learning 
models use dropout on the fully connected layers, but is also possible to use dropout after the max-pooling layers, 
creating image noise augmentation.
 Dropout randomly zeroes some of the connections of the input tensor with probability p using samples from a 
Bernoulli distribution.
Basic concepts revolving around CNNs
 6. Loss function — Cross Entropy
 A loss function is a method of evaluating how well the model models the dataset. 
The loss function will output a higher number if the predictions are off the actual 
target values whereas otherwise it will output a lower number.
 Since our problem is of type multi-class classification we will be using cross 
entropy as our loss function. It basically outputs a higher value if the predicted 
class label probability is low for the actual target class label.
Concepts revolving around CNNs
 7. Summary
 While this chapter covers most of the concepts revolving around a CNN 
model used to classify images, it is by no means a comprehensive guide. It 
is focused towards beginners and the final goal is to implement a CNN 
MNIST handwritten data classifier.
 In the end of our course, students have to be more practical by using 
Pytorch to Implement a CNN to classify MNIST handwritten digits we will 
putting all these concepts to use by implementing a Convolutional Neural 
Network (CNN) network to classify MNIST Handwritten Digits.
Concepts revolving around CNNs
 7. Summary
            `
        }
    ]
}; 
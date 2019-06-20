//FFT.js
var FFTJS=function(t){function r(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var i={};return r.m=t,r.c=i,r.i=function(t){return t},r.d=function(t,i,e){r.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:e})},r.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(i,"a",i),i},r.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},r.p="",r(r.s=0)}([function(t,r,i){"use strict";function e(t){if(this.size=0|t,this.size<=1||0!=(this.size&this.size-1))throw new Error("FFT size must be a power of two and bigger than 1");this._csize=t<<1;for(var r=new Array(2*this.size),i=0;i<r.length;i+=2){var e=Math.PI*i/this.size;r[i]=Math.cos(e),r[i+1]=-Math.sin(e)}this.table=r;for(var o=0,n=1;this.size>n;n<<=1)o++;this._width=o%2==0?o-1:o,this._bitrev=new Array(1<<this._width);for(var s=0;s<this._bitrev.length;s++){this._bitrev[s]=0;for(var a=0;a<this._width;a+=2){var h=this._width-a-2;this._bitrev[s]|=(s>>>a&3)<<h}}this._out=null,this._data=null,this._inv=0}t.exports=e,e.prototype.fromComplexArray=function(t,r){for(var i=r||new Array(t.length>>>1),e=0;e<t.length;e+=2)i[e>>>1]=t[e];return i},e.prototype.createComplexArray=function(){for(var t=new Array(this._csize),r=0;r<t.length;r++)t[r]=0;return t},e.prototype.toComplexArray=function(t,r){for(var i=r||this.createComplexArray(),e=0;e<i.length;e+=2)i[e]=t[e>>>1],i[e+1]=0;return i},e.prototype.completeSpectrum=function(t){for(var r=this._csize,i=r>>>1,e=2;e<i;e+=2)t[r-e]=t[e],t[r-e+1]=-t[e+1]},e.prototype.transform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=0,this._transform4(),this._out=null,this._data=null},e.prototype.realTransform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=0,this._realTransform4(),this._out=null,this._data=null},e.prototype.inverseTransform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=1,this._transform4();for(var i=0;i<t.length;i++)t[i]/=this.size;this._out=null,this._data=null},e.prototype._transform4=function(){var t,r,i=this._out,e=this._csize,o=this._width,n=1<<o,s=e/n<<1,a=this._bitrev;if(4===s)for(t=0,r=0;t<e;t+=s,r++){var h=a[r];this._singleTransform2(t,h,n)}else for(t=0,r=0;t<e;t+=s,r++){var f=a[r];this._singleTransform4(t,f,n)}var u=this._inv?-1:1,_=this.table;for(n>>=2;n>=2;n>>=2){s=e/n<<1;var l=s>>>2;for(t=0;t<e;t+=s)for(var p=t+l,v=t,c=0;v<p;v+=2,c+=n){var d=v,m=d+l,y=m+l,b=y+l,w=i[d],g=i[d+1],z=i[m],T=i[m+1],x=i[y],A=i[y+1],C=i[b],E=i[b+1],F=w,I=g,M=_[c],R=u*_[c+1],O=z*M-T*R,P=z*R+T*M,j=_[2*c],S=u*_[2*c+1],J=x*j-A*S,k=x*S+A*j,q=_[3*c],B=u*_[3*c+1],D=C*q-E*B,G=C*B+E*q,H=F+J,K=I+k,L=F-J,N=I-k,Q=O+D,U=P+G,V=u*(O-D),W=u*(P-G),X=H+Q,Y=K+U,Z=H-Q,$=K-U,tt=L+W,rt=N-V,it=L-W,et=N+V;i[d]=X,i[d+1]=Y,i[m]=tt,i[m+1]=rt,i[y]=Z,i[y+1]=$,i[b]=it,i[b+1]=et}}},e.prototype._singleTransform2=function(t,r,i){var e=this._out,o=this._data,n=o[r],s=o[r+1],a=o[r+i],h=o[r+i+1],f=n+a,u=s+h,_=n-a,l=s-h;e[t]=f,e[t+1]=u,e[t+2]=_,e[t+3]=l},e.prototype._singleTransform4=function(t,r,i){var e=this._out,o=this._data,n=this._inv?-1:1,s=2*i,a=3*i,h=o[r],f=o[r+1],u=o[r+i],_=o[r+i+1],l=o[r+s],p=o[r+s+1],v=o[r+a],c=o[r+a+1],d=h+l,m=f+p,y=h-l,b=f-p,w=u+v,g=_+c,z=n*(u-v),T=n*(_-c),x=d+w,A=m+g,C=y+T,E=b-z,F=d-w,I=m-g,M=y-T,R=b+z;e[t]=x,e[t+1]=A,e[t+2]=C,e[t+3]=E,e[t+4]=F,e[t+5]=I,e[t+6]=M,e[t+7]=R},e.prototype._realTransform4=function(){var t,r,i=this._out,e=this._csize,o=this._width,n=1<<o,s=e/n<<1,a=this._bitrev;if(4===s)for(t=0,r=0;t<e;t+=s,r++){var h=a[r];this._singleRealTransform2(t,h>>>1,n>>>1)}else for(t=0,r=0;t<e;t+=s,r++){var f=a[r];this._singleRealTransform4(t,f>>>1,n>>>1)}var u=this._inv?-1:1,_=this.table;for(n>>=2;n>=2;n>>=2){s=e/n<<1;var l=s>>>1,p=l>>>1,v=p>>>1;for(t=0;t<e;t+=s)for(var c=0,d=0;c<=v;c+=2,d+=n){var m=t+c,y=m+p,b=y+p,w=b+p,g=i[m],z=i[m+1],T=i[y],x=i[y+1],A=i[b],C=i[b+1],E=i[w],F=i[w+1],I=g,M=z,R=_[d],O=u*_[d+1],P=T*R-x*O,j=T*O+x*R,S=_[2*d],J=u*_[2*d+1],k=A*S-C*J,q=A*J+C*S,B=_[3*d],D=u*_[3*d+1],G=E*B-F*D,H=E*D+F*B,K=I+k,L=M+q,N=I-k,Q=M-q,U=P+G,V=j+H,W=u*(P-G),X=u*(j-H),Y=K+U,Z=L+V,$=N+X,tt=Q-W;if(i[m]=Y,i[m+1]=Z,i[y]=$,i[y+1]=tt,0!==c){if(c!==v){var rt=N,it=-Q,et=K,ot=-L,nt=-u*X,st=-u*W,at=-u*V,ht=-u*U,ft=rt+nt,ut=it+st,_t=et+ht,lt=ot-at,pt=t+p-c,vt=t+l-c;i[pt]=ft,i[pt+1]=ut,i[vt]=_t,i[vt+1]=lt}}else{var ct=K-U,dt=L-V;i[b]=ct,i[b+1]=dt}}}},e.prototype._singleRealTransform2=function(t,r,i){var e=this._out,o=this._data,n=o[r],s=o[r+i],a=n+s,h=n-s;e[t]=a,e[t+1]=0,e[t+2]=h,e[t+3]=0},e.prototype._singleRealTransform4=function(t,r,i){var e=this._out,o=this._data,n=this._inv?-1:1,s=2*i,a=3*i,h=o[r],f=o[r+i],u=o[r+s],_=o[r+a],l=h+u,p=h-u,v=f+_,c=n*(f-_),d=l+v,m=p,y=-c,b=l-v,w=p,g=c;e[t]=d,e[t+1]=0,e[t+2]=m,e[t+3]=y,e[t+4]=b,e[t+5]=0,e[t+6]=w,e[t+7]=g}}]);
//Cached line coefficients for faster calculation
let LINE_COEFFS={"jReciprocal":[0,1,0.5,0.3333333333333333,0.25,0.2,0.16666666666666666,0.14285714285714285,0.125,0.1111111111111111,0.1,0.09090909090909091,0.08333333333333333,0.07692307692307693,0.07142857142857142,0.06666666666666667,0.0625,0.058823529411764705,0.05555555555555555,0.05263157894736842,0.05,0.047619047619047616,0.045454545454545456,0.043478260869565216,0.041666666666666664,0.04,0.038461538461538464,0.037037037037037035,0.03571428571428571,0.034482758620689655,0.03333333333333333,0.03225806451612903,0.03125,0.030303030303030304,0.029411764705882353,0.02857142857142857,0.027777777777777776,0.02702702702702703,0.02631578947368421,0.02564102564102564,0.025,0.024390243902439025,0.023809523809523808,0.023255813953488372,0.022727272727272728,0.022222222222222223,0.021739130434782608,0.02127659574468085,0.020833333333333332,0.02040816326530612,0.02,0.0196078431372549,0.019230769230769232,0.018867924528301886,0.018518518518518517,0.01818181818181818,0.017857142857142856,0.017543859649122806,0.017241379310344827,0.01694915254237288,0.016666666666666666,0.01639344262295082,0.016129032258064516,0.015873015873015872,0.015625,0.015384615384615385,0.015151515151515152,0.014925373134328358,0.014705882352941176,0.014492753623188406,0.014285714285714285,0.014084507042253521,0.013888888888888888,0.0136986301369863,0.013513513513513514,0.013333333333333334,0.013157894736842105,0.012987012987012988,0.01282051282051282,0.012658227848101266,0.0125],"log2jOverj":[0,0,0.5,0.5283208335737187,0.5,0.46438561897747244,0.430827083453526,0.4010507031510863,0.375,0.3522138890491458,0.3321928094887362,0.3144937835124816,0.29874687506009634,0.2846492090877763,0.2719539230041146,0.26045937304056793,0.25,0.24043899066178465,0.23166250008012845,0.2235751322865045,0.21609640474436814,0.2091579725132743,0.20270143721078623,0.19667660678508753,0.19104010419671483,0.18575424759098896,0.1807861430054266,0.1761069445245729,0.171691247216343,0.16751658603888178,0.1635630198536173,0.15981278420602824,0.15625,0.15286042785934706,0.14963126003677468,0.14655094334128474,0.14360902781784202,0.14079603690889053,0.13810335561693646,0.13552313381698072,0.13304820237218407,0.1306720001126362,0.12838851006616098,0.1261922035977232,0.12407799133266585,0.12204117991843721,0.12007743382732637,0.11818274152505612,0.11635338543169076,0.11458591518602466,0.11287712379549449,0.11122402631316657,0.10962384073348254,0.10807397084081508,0.10657199078080497,0.10511563115499381,0.10370276646531436,0.10233140375727616,0.10099967232978573,0.09970581439596342,0.09844817659347531,0.09722520225512929,0.09603542436107863,0.09487745910317329,0.09375,0.09265181250813007,0.09158172908118868,0.0905386446336981,0.08952151237132852,0.0885293399533068,0.08756118595635666,0.08661615661274201,0.08569340279780989,0.08479211724493174,0.08391153196795878,0.08305091587327841,0.08220957254531033,0.08138683819084287,0.08058207972900319,0.07979469301490004,0.07902410118609203],"log2jSqOverj":[0,0,0.5,0.8373687095640868,1,1.078270015565451,1.1136718550224287,1.1258916654858653,1.125,1.1164916127521158,1.103520626760198,1.0879697385479519,1.0709963442980739,1.053327239045856,1.0354251073225904,1.0175862750702858,1,0.9827854399177821,0.9660152509807592,0.9497309557616316,0.9339531228688355,0.918688206783136,0.9039331982410029,0.8896788160994065,0.8759117138757998,0.8626160124523607,0.8497743670722426,0.8373687095640868,0.8253807623796954,0.8137923913455405,0.8025858439090442,0.7917439058661588,0.78125,0.7710882433763074,0.761243475326558,0.7517012647977159,0.7424479033482858,0.7334703883422378,0.7247563996410045,0.7162942721834354,0.7080729661787858,0.7000820361509086,0.6923115997143661,0.6847523067005167,0.6773953090585605,0.6702322318147964,0.6632551452695734,0.6564565385357766,0.6498292944679481,0.6433666659919229,0.6370622538171694,0.6309099854949105,0.6249040957723171,0.6190391081849713,0.6133098178251349,0.6077112752211988,0.6022387712633336,0.5968878231112764,0.5916541610219969,0.586533716037376,0.5815226084748061,0.5766171371665986,0.5718137693971721,0.5671091314900821,0.5625,0.5579832934677097,0.553556064699016,0.5492154935311735,0.5449588800529949,0.5407836382472033,0.5366872900258569,0.5326674596317765,0.5287218683808739,0.5248483297221124,0.5210447445935229,0.5173090970542775,0.5136394501742808,0.5100339421640878,0.5064907827292112,0.5030082496340288,0.49958468546157697]}
let SUMMED_LINE_COEFFS={"jReciprocal":[0,1,1.5,1.8333333333333333,2.083333333333333,2.283333333333333,2.4499999999999997,2.5928571428571425,2.7178571428571425,2.8289682539682537,2.9289682539682538,3.0198773448773446,3.103210678210678,3.180133755133755,3.251562326562327,3.3182289932289937,3.3807289932289937,3.439552522640758,3.4951080781963135,3.547739657143682,3.597739657143682,3.6453587047627294,3.690813250217275,3.73429151108684,3.7759581777535067,3.8159581777535068,3.854419716215045,3.8914567532520823,3.927171038966368,3.9616537975870574,3.9949871309203906,4.02724519543652,4.05849519543652,4.08879822573955,4.118209990445433,4.146781419016861,4.174559196794639,4.201586223821666,4.22790201329535,4.2535430389363755,4.278543038936376,4.302933282838815,4.326742806648339,4.349998620601827,4.3727258933290996,4.394948115551322,4.416687245986104,4.4379638417307845,4.4587971750641175,4.4792053383294235,4.499205338329423,4.518813181466678,4.538043950697447,4.556911875225749,4.575430393744267,4.593612211926086,4.611469354783229,4.6290132144323515,4.646254593742697,4.6632037462850695,4.679870412951736,4.696263855574687,4.712392887832752,4.7282659037057675,4.7438909037057675,4.759275519090383,4.774427034241898,4.789352407376227,4.804058289729168,4.818551043352357,4.832836757638071,4.846921264680325,4.860810153569214,4.8745087837062,4.888022297219713,4.901355630553047,4.914513525289889,4.927500538276902,4.940321051097415,4.9529792789455165,4.965479278945517],"log2jOverj":[0,0,0.5,1.0283208335737188,1.5283208335737188,1.9927064525511913,2.4235335360047174,2.824584239155804,3.199584239155804,3.5517981282049496,3.8839909376936856,4.198484721206167,4.497231596266264,4.7818808053540405,5.053834728358155,5.3142941013987235,5.5642941013987235,5.804733092060508,6.036395592140637,6.259970724427141,6.4760671291715095,6.685225101684784,6.88792653889557,7.084603145680657,7.275643249877372,7.461397497468361,7.642183640473787,7.81829058499836,7.989981832214703,8.157498418253585,8.321061438107202,8.480874222313231,8.637124222313231,8.789984650172578,8.939615910209353,9.086166853550639,9.22977588136848,9.37057191827737,9.508675273894307,9.644198407711288,9.777246610083472,9.907918610196107,10.036307120262268,10.162499323859992,10.286577315192657,10.408618495111094,10.52869592893842,10.646878670463476,10.763232055895166,10.87781797108119,10.990695094876685,11.101919121189852,11.211542961923334,11.319616932764148,11.426188923544954,11.531304554699949,11.635007321165263,11.73733872492254,11.838338397252326,11.93804421164829,12.036492388241765,12.133717590496895,12.229753014857973,12.324630473961147,12.418380473961147,12.511032286469277,12.602614015550465,12.693152660184163,12.782674172555492,12.8712035125088,12.958764698465156,13.045380855077898,13.131074257875708,13.21586637512064,13.299777907088599,13.382828822961876,13.465038395507186,13.546425233698029,13.627007313427033,13.706802006441933,13.785826107628026],"log2jSqOverj":[0,0,0.5,1.3373687095640867,2.3373687095640867,3.4156387251295377,4.529310580151966,5.655202245637831,6.780202245637831,7.896693858389947,9.000214485150146,10.088184223698097,11.15918056799617,12.212507807042027,13.247932914364617,14.265519189434903,15.265519189434903,16.248304629352685,17.214319880333445,18.164050836095075,19.09800395896391,20.01669216574705,20.92062536398805,21.810304180087456,22.686215893963258,23.548831906415618,24.39860627348786,25.235974983051946,26.06135574543164,26.87514813677718,27.677733980686224,28.469477886552383,29.250727886552383,30.02181612992869,30.78305960525525,31.534760870052967,32.277208773401256,33.0106791617435,33.7354355613845,34.45172983356793,35.159802799746714,35.859884835897624,36.55219643561199,37.23694874231251,37.91434405137107,38.58457628318586,39.247831428455434,39.90428796699121,40.55411726145916,41.19748392745108,41.83454618126825,42.46545616676316,43.09036026253548,43.70939937072045,44.32270918854558,44.93042046376678,45.53265923503011,46.129547058141384,46.72120121916338,47.307734935200756,47.88925754367556,48.46587468084216,49.03768845023934,49.60479758172942,50.16729758172942,50.72528087519713,51.278836939896145,51.82805243342732,52.37301131348031,52.91379495172752,53.45048224175338,53.98314970138515,54.51187156976603,55.03671989948814,55.557764644081665,56.075073741135945,56.58871319131023,57.09874713347431,57.60523791620352,58.10824616583755,58.60783085129913]}
//Message enums for easier reading
var MessageEnums = {INITIALIZATION_PARAMS: 0,INITIALIZATION_SUCCESS: 1,NOISE_RESULTS: 2,NORMAL_RESULTS: 3,REQUEST_RESULTS: 4,DEBUG: 5};
class VADAudioWorkletProcessor extends AudioWorkletProcessor {
    constructor() {
        //for some gdi reason the constructor node value is undefined. Instead I will use the messaging way to bring in the values lmao
        // The super constructor call is required.
        super();
        //variables
        //2 channels
        //https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4142156/
        //Assume sample rate is 48,000 Hz, precision of 1 FFT freq. bucket is 93.75 Hz
        //https://dsp.stackexchange.com/questions/2818/extracting-frequencies-from-fft
        //For most phonemes, almost all of the energy is contained in the 100 – 4000 Hz range
        //https://en.wikipedia.org/wiki/Sampling_(signal_processing)#Speech_sampling
        //We'd effectively only need to analyze the data from buffer[1] - buffer[42]
        this.firstBin = 0;
        this.silenceTimeThreshold = 2;
        this.distanceThreshold = 80;
        this.lastBin = 80;//MUST be 80. Otherwise, LINE_COEFFS must be updated
        this.fft1BinCount = 512;
        this.fft1 = new FFTJS(this.fft1BinCount);
        this.fft1Out = this.fft1.createComplexArray();
        this.fft2BinCount = 128;
        this.fft2 = new FFTJS(this.fft2BinCount);
        this.fft2In = new Float32Array(this.fft2BinCount);
        this.fft2Out = this.fft2.createComplexArray();
        this.buffer = [new Float32Array(this.fft1BinCount), new Float32Array(this.fft1BinCount)];
        this.bufferIndex = 0;
        this.continueBuffering = true;
        this.speakingHistory = 0;
        this.logDistanceHistogram = [];
        //this.log("init", [this.fft2In, this.buffer]);
        //Other variables but initialized below
        //this.results = [];
        //this.msgEnum = MessageEnums.NORMAL_RESULTS;
        //this.referenceLineFeatures = null;

        this.port.onmessage = (function(event) {
            switch (event.data.msgEnum) {
                case MessageEnums.INITIALIZATION_PARAMS:
                    if (event.data.data != null) {
                        this.msgEnum = MessageEnums.NORMAL_RESULTS;
                        this.referenceLineFeatures = event.data.data;
                        this.results = [];
                    } else {
                        this.msgEnum = MessageEnums.NOISE_RESULTS;
                    }
                    this.port.postMessage({msgEnum: MessageEnums.INITIALIZATION_SUCCESS, data: { received: event.data.data, msgEnum: this.msgEnum, referenceLineFeatures: this.referenceLineFeatures } });
                    break;
                case MessageEnums.REQUEST_RESULTS: 
                    this.resultsRequested = true;
                    this.port.postMessage({data: this.results, msgEnum: this.msgEnum});
                    this.logHistogram();
                    this.logSend();
                    break;
            }
        }).bind(this);
    }
    
    /**
     * Inputs of length 128, buffer size of 512
     * https://en.wikipedia.org/wiki/Voice_frequency "In telephony, the usable voice frequency band ranges from approximately 300 Hz to 3400 Hz."
     * https://en.wikipedia.org/wiki/Sampling_(signal_processing)#Speech_sampling
     * Refer to https://webaudio.github.io/web-audio-api/#dom-audioworkletprocessor-process for the actual API
     * @param {Float32Array} inputs inputs[n][m] is a Float32Array of audio samples for the mth channel of the nth input.
     * @param {Float32Array} outputs The output audio buffer that is to be consumed by the user agent
     * @param {Object} parameters A map of string keys and associated Float32Arrays. parameters["name"] corresponds to the automation values of the AudioParam named "name".
     */
    process(inputs, outputs, parameters) {
        if (this.logBeenSent()) return true;
        if (this.msgEnum == MessageEnums.NOISE_RESULTS) { this.bufferThenProcess(inputs, outputs, parameters, this.processReference.bind(this));} 
        else { this.bufferThenProcess(inputs, outputs, parameters, this.processData.bind(this)); }
        return true;
    }

    /**
     * Buffer samples for rectangle windowing
     * @param {Float32Array} inputs The input audio buffer from the incoming connections provided by the user agent.
     * @param {Float32Array} outputs The output audio buffer that is to be consumed by the user agent
     * @param {Object} parameters A map of string keys and associated Float32Arrays. parameters["name"] corresponds to the automation values of the AudioParam named "name".
     * @param {Function} calledFunction function that is called with the buffer as an argument
     */
    bufferThenProcess(inputs, outputs, parameters, calledFunction) {
        if (this.continueBuffering) {
            if (this.bufferIndex >= this.fft1BinCount) {
                calledFunction(parameters);
                //"clear" for reuse buffer
                this.bufferIndex = 0;
            }

            //concat to buffer, use set because this is Float32Array
            for (var i = 0; i < inputs[0].length; i++) {
                this.buffer[i].set(inputs[0][i], this.bufferIndex);
            }
            this.bufferIndex += inputs[0][0].length;    
        }
    }

    /**
     * Process & average 10 samples of noise (assume that the start of the webcast is noise) as reference.
     * @param {Object} parameters A map of string keys and associated Float32Arrays. parameters["name"] corresponds to the automation values of the AudioParam named "name".
     */
    processReference(parameters) {
        //this.log("refResults", this.results);
        if (this.referenceSamples == null) {
            this.referenceSamples = 0;
            this.results = [[0,0,0,0,0], [0,0,0,0,0]];
        }
        if (this.referenceSamples < 10) {
            let newData = this.processData(parameters, false);
            //this.log("refNewData", newData);
            this.referenceSamples++;
            for (let i = 0; i < this.results.length; i++) {
                for (let j = 0; j < this.results[i].length; j++) {
                    this.results[i][j] += newData[i][j];
                }
            }
            if (this.referenceSamples >= 10) {
                for (let i = 0; i < this.results.length; i++) {
                    for (let j = 0; j < this.results[i].length; j++) {
                        this.results[i][j] /= this.referenceSamples;
                    }
                }
                this.continueBuffering = false;
            }
        }
    }

    //ded this is returning NaN
    //Could be the 2nd fft but if that is the case it would be p troublesome if it's an issue innate to fft
    /**
     * VAD section
     * https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4142156/
     * @param {Boolean} checkForSpeech Check if speaking against reference.
     */
    processData(parameters, checkForSpeech = true) {
        //process for both channels
        let lineFeatures = [];
        let isSpeaking = false;
        for (let i = 0; i < this.buffer.length; i++) {
            //DCFT, but with 48k sample instead of downsampled 8k.
            //Don't want to downsample to reduce noise created from downsampling & reduce processing.
            //Instead, first FFT will FFT the entire 48k sample, then 2nd FFT will use the range from 0 - 12k Hz.
            //First FFT
            //this.log("buffer", this.buffer[i]);
            this.fft1.realTransform(this.fft1Out, this.buffer[i]);
            //this.log("fft1Out", this.fft1Out);
            //Prepare magnitude of first 128 bins (0 - 12k Hz)
            this.binsToMagnitudeArray(this.fft1Out, this.fft2BinCount, this.fft2In);
            //this.log("fft2In1", [this.fft2Out, this.fft2In]);
            //Second FFT to better distinguish the harmonic signals from 0 Hz - 12k Hz
            this.fft2.realTransform(this.fft2Out, this.fft2In);
            //this.log("fft2Out", [this.fft2Out, this.fft2In]);
            //Reuse the fft2In buffer to store our magnitudes
            this.binsToMagnitudeArray(this.fft2Out, this.lastBin, this.fft2In);
            //this.log("fft2In2", this.fft2In);
            lineFeatures.push(this.calculateLineFeatures(this.fft2In, this.lastBin));
            //Check against reference noise if is speaking
            if (checkForSpeech && this.calculateDistanceMeasurement(lineFeatures[i], this.referenceLineFeatures[i]) > this.distanceThreshold) {
                isSpeaking = true;
                break;
            }
        }

        if (isSpeaking) {
            if (this.speakingHistory === 0) {
                this.changedSpeech(true);
            }
            this.speakingHistory = this.silenceTimeThreshold;
        } else if (this.speakingHistory > 0) {
            this.speakingHistory--;
            if (this.speakingHistory === 0) {
                this.changedSpeech(false);
            }
        }
        return lineFeatures;
    }

    binsToMagnitudeArray(complexArray, binCount, magArr) {
        //this.log("binsToMagnitudeArray", [complexArray, binCount, magArr]);
        for (let i = 0; i < binCount; i++) {
            magArr[i] = this.calculateFftBinMagnitude(complexArray, i);
            //this.log("midBins", [magArr, i, magArr[i]]);
        }
        //this.log("postBinsToMagnitudeArray", [complexArray, binCount, magArr]);
    }

    calculateLineFeatures(magArr, magArrLength) {
        let lineFeatures = [];
        //Get Fmean and L
        let sumMagDivj = 0;
        let sumMagLog2JDivj = 0;
        let sumMag = 0;
        for (let j = 1; j <= magArrLength; j++) {
            //ERROR: CALCULATION ERROR HERE, LINE_COEFFS are SUM
            sumMagDivj += magArr[j] * LINE_COEFFS.jReciprocal[j];
            sumMagLog2JDivj += magArr[j] * LINE_COEFFS.log2jOverj[j];
            sumMag += magArr[j];
        }
        //lineFeatures.fMean 
        lineFeatures.push(sumMag / sumMagDivj);
        let l = Math.floor(lineFeatures[0]);
        //Calculate low index line fitting coeffs
        //Matrix values
        let a = SUMMED_LINE_COEFFS.jReciprocal[l];
        let bOrC = SUMMED_LINE_COEFFS.log2jOverj[l];
        let d = SUMMED_LINE_COEFFS.log2jSqOverj[l];
        let determinant = 1 / (a * d - bOrC * bOrC);
        let x = 0;
        let y = 0;
        for (let j = 1; j <= l; j++) {
            x += magArr[j] * LINE_COEFFS.jReciprocal[j];
            y += magArr[j] * LINE_COEFFS.log2jOverj[j];
        }
        //lineFeatures.al0 
        lineFeatures.push(determinant * (a * x + bOrC * y));
        //lineFeatures.al1 
        lineFeatures.push(determinant * (bOrC * x + d * y));
        //this.log("LF", [magArr, lineFeatures, sumMag, sumMagDivj, sumMagLog2JDivj, determinant, a, bOrC, d, x, y, l, magArrLength, SUMMED_LINE_COEFFS]);
        //Calculate high index line fitting coeffs
        a = SUMMED_LINE_COEFFS.jReciprocal[magArrLength] - a;
        bOrC = SUMMED_LINE_COEFFS.log2jOverj[magArrLength] - bOrC;
        d = SUMMED_LINE_COEFFS.log2jSqOverj[magArrLength] - d;
        determinant = 1 / (a * d - bOrC * bOrC);
        x = sumMagDivj - x;
        y = sumMagLog2JDivj - y;
        //lineFeatures.ah0 
        lineFeatures.push(determinant * (a * x + bOrC * y));
        //lineFeatures.ah1 
        lineFeatures.push(determinant * (bOrC * x + d * y));

        for (let i = 0; i < magArr.length; i++) {
            if (!isFinite(magArr[i])) {
                this.log("NaN MA", [magArr,lineFeatures,sumMag,sumMagDivj,sumMagLog2JDivj,determinant,a,bOrC,d,x,y,l,LINE_COEFFS]);
                this.logSend();
            }
        }

        for (let i = 0; i < lineFeatures.length; i++) {
            if (!isFinite(lineFeatures[i])) {
                this.log("NaN LF", [magArr, lineFeatures, sumMag, sumMagDivj, sumMagLog2JDivj, determinant, a, bOrC, d, x, y,l, magArrLength, LINE_COEFFS]);
                this.logSend();
            }
        }

        return lineFeatures;
    }

    /**
     * Compare the distance between sets of two line features. Idea is that the line features of a noise signal will be similar to that of the reference signal.
     * @param {Array[5]} lineFeatures1 Line features 1
     * @param {Array[5]} lineFeatures2 Line features 2
     */
    calculateDistanceMeasurement(lineFeatures1, lineFeatures2) {
        let sum = 0;
        for (let i = 0; i < lineFeatures1.length; i++) {
            sum += Math.pow(lineFeatures1[i] - lineFeatures2[i], 2);
        }

        this.addToHistogram(Math.floor(Math.sqrt(sum)));
        this.log("dist", Math.sqrt(sum));
        return Math.sqrt(sum);
    }

    calculateFftBinMagnitude(complexArray, binIndex) {
        ////this.log("calculateFftBinMagnitude", [complexArray, binIndex, binIndex*2, complexArray[binIndex]*complexArray[binIndex] + complexArray[binIndex+1]*complexArray[binIndex+1], Math.sqrt(complexArray[binIndex]*complexArray[binIndex] + complexArray[binIndex+1]*complexArray[binIndex+1])]);
        binIndex *= 2;
        return Math.sqrt(complexArray[binIndex]*complexArray[binIndex] + complexArray[binIndex+1]*complexArray[binIndex+1]);
    }

    /**
     * Store into results upon changing speech
     * @param {Boolean} startedSpeech isSpeaking
     */
    changedSpeech(startedSpeech) {
        this.results.push({isSpeaking: startedSpeech, time: currentTime});
    }

    addToHistogram(index) {
        if (this.logDistanceHistogram == null)
            this.logDistanceHistogram = [];
        if (this.logDistanceHistogram[index] == null)
            this.logDistanceHistogram[index] = 0;
        this.logDistanceHistogram[index]++;
    }
    logHistogram() {
        this.log("histogram", this.logDistanceHistogram);
    }

    log(key, value) {
        //Define self so to avoid collision with "this\.log"
        let self = this;
        if (self.logData == null) {
            self.logData = [];
        }
        self.logData.push({t: currentTime, k: key, v: value});
    }

    logSend() {
        //Define self so to avoid collision with "this\.log"
        let self = this;
        if (self.logData == null) {
            self.logData = [];
        }
        this.sentLog = true;
        this.port.postMessage({data: self.logData, msgEnum: MessageEnums.DEBUG});
    }

    logBeenSent() {
        return this.sentLog === true;
    }
}

registerProcessor("vad-audio-worklet-processor", VADAudioWorkletProcessor);
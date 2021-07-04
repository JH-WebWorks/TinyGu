install: rmold build_backend build_frontend
	echo "Done"

build_frontend: 
	cd frontend; \
	yarn run build; \
	mkdir ../build/build; \
	mv build/* ../build/build; \
	rmdir build; \

build_backend:
	cd backend; \
	yarn run build; \
	yarn install --production --modules-folder build/node_modules; \
	mkdir ./build/prisma; \
	cp ./prisma/schema.prisma ./build/prisma/schema.prisma; \
	npx prisma generate --schema=./build/prisma/schema.prisma; \
	mkdir ../build; \
	mv build/* ../build/; \
	rmdir build; \

rmold:
	rm -rf build
